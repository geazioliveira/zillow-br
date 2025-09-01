import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { QueryFailedError } from 'typeorm'
import { DATABASE_ERROR_CODES, HTTP_STATUS_ERROR_CODES } from './utils'
import { ErrorResponse } from './types'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const errorResponse = this.buildErrorResponse(exception, request)

    // Log the error with appropriate level
    this.logError(exception, request, errorResponse)

    response.status(errorResponse.error.statusCode).json(errorResponse)
  }

  private buildErrorResponse(
    exception: unknown,
    request: Request
  ): ErrorResponse {
    const timestamp = new Date().toISOString()
    const path = request.url
    const method = request.method

    // Handle HTTP Exceptions (NestJS built-in)
    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      const exceptionResponse = exception.getResponse()

      return {
        success: false,
        error: {
          code: this.getHttpErrorCode(status),
          message: this.extractMessage(exceptionResponse),
          details: this.extractDetails(exceptionResponse),
          timestamp,
          path,
          method,
          statusCode: status,
          severity: this.getSeverityLevel(status),
        },
      }
    }

    // Handle TypeORM Database Errors
    if (exception instanceof QueryFailedError) {
      return this.handleDatabaseError(exception, timestamp, path, method)
    }

    // Handle Validation Errors (class-validator)
    if (this.isValidationError(exception)) {
      return this.handleValidationError(exception, timestamp, path, method)
    }

    // Handle JavaScript native errors
    if (exception instanceof Error) {
      return this.handleNativeError(exception, timestamp, path, method)
    }

    // Handle unexpected errors
    return {
      success: false,
      error: {
        code: HTTP_STATUS_ERROR_CODES[HttpStatus.INTERNAL_SERVER_ERROR],
        message: 'An unexpected error occurred. Please try again later.',
        timestamp,
        path,
        method,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        severity: 'critical',
      },
    }
  }

  private getHttpErrorCode(status: HttpStatus): string {
    return HTTP_STATUS_ERROR_CODES[status] || 'UNKNOWN_HTTP_ERROR'
  }

  private getSeverityLevel(
    status: HttpStatus
  ): 'low' | 'medium' | 'high' | 'critical' {
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) return 'critical'
    if (status >= HttpStatus.BAD_REQUEST) return 'medium'
    return 'low'
  }

  private extractMessage(exceptionResponse: any): string {
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse
    }

    if (exceptionResponse?.message) {
      if (Array.isArray(exceptionResponse.message)) {
        return exceptionResponse.message.join('; ')
      }
      return exceptionResponse.message
    }

    return 'An error occurred'
  }

  private extractDetails(exceptionResponse: any): any {
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const { message, error, statusCode, ...details } = exceptionResponse
      return Object.keys(details).length > 0 ? details : undefined
    }
    return undefined
  }

  private handleDatabaseError(
    error: QueryFailedError,
    timestamp: string,
    path: string,
    method: string
  ): ErrorResponse {
    const driverError = error.driverError as any
    const sqlState = driverError?.code
    const errorCode =
      DATABASE_ERROR_CODES[sqlState as keyof typeof DATABASE_ERROR_CODES] ||
      'DATABASE_ERROR'

    // Map database errors to appropriate HTTP status codes
    const statusCode = this.mapDatabaseErrorToHttpStatus(sqlState)
    const severity = this.getDatabaseErrorSeverity(sqlState)

    return {
      success: false,
      error: {
        code: errorCode,
        message: this.getDatabaseErrorMessage(sqlState, driverError),
        details: {
          sqlState,
          constraint: driverError?.constraint,
          column: driverError?.column,
          table: driverError?.table,
          schema: driverError?.schema,
        },
        timestamp,
        path,
        method,
        statusCode,
        severity,
      },
    }
  }

  private mapDatabaseErrorToHttpStatus(sqlState: string): HttpStatus {
    const statusMapping: { [key: string]: HttpStatus } = {
      '23505': HttpStatus.CONFLICT, // Unique constraint violation
      '23503': HttpStatus.BAD_REQUEST, // Foreign key constraint violation
      '23502': HttpStatus.BAD_REQUEST, // Not null violation
      '23514': HttpStatus.BAD_REQUEST, // Check constraint violation
      '08006': HttpStatus.SERVICE_UNAVAILABLE, // Connection failure
      '08001': HttpStatus.SERVICE_UNAVAILABLE, // Connection unable
      '42501': HttpStatus.FORBIDDEN, // Insufficient privilege
      '42703': HttpStatus.BAD_REQUEST, // Undefined column
      '42P01': HttpStatus.BAD_REQUEST, // Undefined table
    }

    return statusMapping[sqlState] || HttpStatus.INTERNAL_SERVER_ERROR
  }

  private getDatabaseErrorMessage(sqlState: string, driverError: any): string {
    const messageMapping: { [key: string]: string } = {
      '23505': 'A record with this information already exists.',
      '23503': 'Cannot perform this operation due to related data constraints.',
      '23502': 'Required field is missing.',
      '23514': 'Data violates business rules.',
      '08006': 'Database connection lost. Please try again.',
      '08001': 'Unable to connect to database.',
      '42501': 'Insufficient database privileges.',
      '42703': 'Invalid database column referenced.',
      '42P01': 'Database table does not exist.',
    }

    return (
      messageMapping[sqlState] || 'A database error occurred. Please try again.'
    )
  }

  private getDatabaseErrorSeverity(
    sqlState: string
  ): 'low' | 'medium' | 'high' | 'critical' {
    const criticalErrors = ['08006', '08001', '08004']
    const highErrors = ['42501', '28000']
    const mediumErrors = ['23505', '23503', '23502', '23514']

    if (criticalErrors.includes(sqlState)) return 'critical'
    if (highErrors.includes(sqlState)) return 'high'
    if (mediumErrors.includes(sqlState)) return 'medium'
    return 'low'
  }

  private handleNativeError(
    error: Error,
    timestamp: string,
    path: string,
    method: string
  ): ErrorResponse {
    // Handle specific JavaScript error types
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
    let errorCode = 'INTERNAL_SERVER_ERROR'
    let message = 'An internal error occurred.'

    if (error instanceof TypeError) {
      statusCode = HttpStatus.BAD_REQUEST
      errorCode = 'TYPE_ERROR'
      message = 'Invalid data type provided.'
    } else if (error instanceof RangeError) {
      statusCode = HttpStatus.BAD_REQUEST
      errorCode = 'RANGE_ERROR'
      message = 'Value out of expected range.'
    } else if (error instanceof SyntaxError) {
      statusCode = HttpStatus.BAD_REQUEST
      errorCode = 'SYNTAX_ERROR'
      message = 'Invalid syntax in request.'
    }

    return {
      success: false,
      error: {
        code: errorCode,
        message,
        details: { originalError: error.name },
        timestamp,
        path,
        method,
        statusCode,
        severity: statusCode >= 500 ? 'critical' : 'medium',
      },
    }
  }

  private isValidationError(exception: unknown): boolean {
    return exception instanceof Error && exception.name === 'ValidationError'
  }

  private handleValidationError(
    error: any,
    timestamp: string,
    path: string,
    method: string
  ): ErrorResponse {
    return {
      success: false,
      error: {
        code: HTTP_STATUS_ERROR_CODES[HttpStatus.UNPROCESSABLE_ENTITY],
        message: 'Input validation failed.',
        details: error.details || error.message,
        timestamp,
        path,
        method,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        severity: 'medium',
      },
    }
  }

  private logError(
    exception: unknown,
    request: Request,
    errorResponse: ErrorResponse
  ): void {
    const { error } = errorResponse
    const logMessage = `${error.method} ${error.path} - ${error.code}: ${error.message}`

    // Enhanced logging based on severity
    switch (error.severity) {
      case 'critical':
        this.logger.error(
          `🚨 CRITICAL: ${logMessage}`,
          exception instanceof Error ? exception.stack : exception
        )
        break
      case 'high':
        this.logger.error(`⚠️ HIGH: ${logMessage}`)
        break
      case 'medium':
        this.logger.warn(`⚡ MEDIUM: ${logMessage}`)
        break
      case 'low':
        this.logger.log(`ℹ️ LOW: ${logMessage}`)
        break
      default:
        this.logger.error(
          logMessage,
          exception instanceof Error ? exception.stack : exception
        )
    }

    // Additional context logging for critical errors
    if (error.severity === 'critical') {
      this.logger.error('Request details:', {
        headers: request.headers,
        body: request.body,
        query: request.query,
        params: request.params,
      })
    }
  }
}
