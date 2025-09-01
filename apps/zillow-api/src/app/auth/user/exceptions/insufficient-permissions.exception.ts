import { HttpStatus } from '@nestjs/common'
import { BaseCustomException } from '../../../../core/exceptions/base-custom.exception'

export class InsufficientPermissionsException extends BaseCustomException {
  constructor(resource?: string) {
    super(
      'INSUFFICIENT_PERMISSIONS',
      resource
        ? `You don't have permission to access ${resource}.`
        : "You don't have sufficient permissions for this action.",
      HttpStatus.FORBIDDEN,
      { resource }
    )
  }
}
