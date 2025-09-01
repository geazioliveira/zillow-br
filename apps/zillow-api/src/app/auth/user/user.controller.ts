import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { UserCreateDto } from './dto/user-create.dto'
import { UserResponseDto } from './dto/user-response.dto'
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor'

@Controller('auth/users')
@UseInterceptors(new TransformInterceptor(UserResponseDto))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: UserCreateDto): Promise<UserResponseDto> {
    return this.userService.create(user)
  }

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserResponseDto | null> {
    return this.userService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() user: Partial<UserEntity>
  ): Promise<UserResponseDto | null> {
    return this.userService.update(id, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id)
  }
}
