import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from './user/user.service'
import { LoginDto } from './dto/login.dto'
import { UserEntity } from './user/user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(
    loginDto: LoginDto
  ): Promise<{ user: UserEntity; accessToken: string }> {
    const { email, password } = loginDto

    const user = await this.userService.findByEmail(email)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await user.verifyPassword(password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const accessToken = this.generateAccessToken(user)

    return {
      user,
      accessToken,
    }
  }

  private generateAccessToken(user: UserEntity): string {
    // Simple token generation - in production, use JWT with proper signing
    const payload = {
      sub: user.id,
      email: user.email,
      iat: Date.now(),
    }
    return Buffer.from(JSON.stringify(payload)).toString('base64')
  }
}
