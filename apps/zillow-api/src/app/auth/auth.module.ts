import { Module } from '@nestjs/common'

import { LoginModule } from './login/login.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [LoginModule, UserModule],
  exports: [LoginModule],
})
export class AuthModule {}
