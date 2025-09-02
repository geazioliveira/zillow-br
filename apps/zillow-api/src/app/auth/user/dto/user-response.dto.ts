import { Expose, Transform } from 'class-transformer'
import { UserEntity } from '../user.entity'

export class UserResponseDto extends UserEntity {
  @Expose()
  public override id: string

  @Expose()
  public override firstName: string

  @Expose()
  public override lastName: string

  @Expose()
  @Transform(({ obj }) => `${obj.firstName} ${obj.lastName}`)
  fullName: string

  @Expose()
  public override email: string

  // Password is not exposed, so it will be excluded
  public override password: string

  @Expose()
  public override phone: string

  @Expose()
  public override createdAt: Date

  @Expose()
  public override updatedAt: Date
}
