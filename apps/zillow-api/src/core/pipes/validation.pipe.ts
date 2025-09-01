import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    const object = plainToInstance(metatype, value)
    const errors = await validate(object)

    if (errors.length > 0) {
      const formattedErrors = this.formatErrors(errors)
      throw new BadRequestException({
        code: 'VALIDATION_ERROR',
        message: 'Input validation failed. Please check your data.',
        details: {
          fields: formattedErrors,
          totalErrors: errors.length,
        },
      })
    }
    return value
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }

  private formatErrors(errors: any[]): any {
    const formattedErrors: any = {}

    errors.forEach((error) => {
      formattedErrors[error.property] = {
        value: error.value,
        errors: Object.values(error.constraints || {}),
        children:
          error.children?.length > 0
            ? this.formatErrors(error.children)
            : undefined,
      }
    })

    return formattedErrors
  }
}
