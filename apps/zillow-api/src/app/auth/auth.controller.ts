import { Body, Controller, Post, UseInterceptors } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { TransformInterceptor } from '../../core/interceptors/transform.interceptor'
import { LoginResponseDto } from './dto/login-response.dto'
import { AuthService } from './auth.service'

@Controller('auth')
@UseInterceptors(new TransformInterceptor(LoginResponseDto))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const { user, accessToken } = await this.authService.login(loginDto)

    return {
      user,
      accessToken,
      tokenType: 'Bearer',
    } as unknown as LoginResponseDto
  }
}
