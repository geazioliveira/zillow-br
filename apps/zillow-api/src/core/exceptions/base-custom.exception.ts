import { HttpException, HttpStatus } from '@nestjs/common'

export abstract class BaseCustomException extends HttpException {
  constructor(
    code: string,
    message: string,
    statusCode: HttpStatus,
    details?: any,
    cause?: Error
  ) {
    super(
      {
        code,
        message,
        details,
      },
      statusCode,
      { cause }
    )
  }
}
