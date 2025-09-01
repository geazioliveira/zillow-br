export interface ErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: any
    timestamp: string
    path: string
    method: string
    statusCode: number
    severity?: 'low' | 'medium' | 'high' | 'critical'
  }
}

export interface SuccessResponse<T = any> {
  success: true
  data: T
  meta?: {
    timestamp: string
    version?: string
  }
}
