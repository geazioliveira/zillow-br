import { HttpStatus } from '@nestjs/common'
import { BaseCustomException } from '../../../../core/exceptions/base-custom.exception'

export class UserNotFoundException extends BaseCustomException {
  constructor(identifier?: string) {
    super(
      'USER_NOT_FOUND',
      identifier
        ? `User with identifier ${identifier} was not found`
        : 'User not found',
      HttpStatus.NOT_FOUND,
      { identifier }
    )
  }
}
