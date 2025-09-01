import { HttpStatus } from '@nestjs/common'
import { BaseCustomException } from '../../../../core/exceptions/base-custom.exception'

export class InvalidCredentialsException extends BaseCustomException {
  constructor() {
    super(
      'INVALID_CREDENTIALS',
      'The provided credentials are invalid.',
      HttpStatus.UNAUTHORIZED
    )
  }
}
