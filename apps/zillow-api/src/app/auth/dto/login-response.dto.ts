import { UserResponseDto } from '../user/dto/user-response.dto'
import { Expose, Type } from 'class-transformer'

export class LoginResponseDto {
  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto

  @Expose()
  tokenType: string = 'Bearer'

  @Expose()
  accessToken: string
}
