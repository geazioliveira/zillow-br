import { HttpStatus } from '@nestjs/common'
import { BaseCustomException } from '../../../../core/exceptions/base-custom.exception'

export class UserAlreadyExistsException extends BaseCustomException {
  constructor(email?: string) {
    super(
      'USER_ALREADY_EXISTS',
      email
        ? `User with email ${email} already exists.`
        : 'User already exists.',
      HttpStatus.CONFLICT,
      { email }
    )
  }
}
