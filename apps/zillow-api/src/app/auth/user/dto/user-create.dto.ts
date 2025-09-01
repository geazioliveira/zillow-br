import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

import { UserEntity } from '../user.entity'

export class UserCreateDto extends UserEntity {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'First name must be at least 2 characters long',
  })
  @MaxLength(50, {
    message: 'First name must be at most 50 characters long',
  })
  @Transform(({ value }) => value.trim(), { toClassOnly: true })
  @ApiProperty()
  public override firstName: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  @Transform(({ value }) => value?.trim())
  @ApiProperty()
  public override lastName: string

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase()?.trim())
  @ApiProperty()
  public override email: string

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password must not exceed 128 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  @ApiProperty()
  public override password: string

  @IsOptional()
  @IsString()
  @Matches(/^\+?[\d\s\-\(\)]+$/, {
    message: 'Please provide a valid phone number',
  })
  @Transform(({ value }) => value?.replace(/\s/g, ''))
  @ApiProperty()
  override phone?: string
}
