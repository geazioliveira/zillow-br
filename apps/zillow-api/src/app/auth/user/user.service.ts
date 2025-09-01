import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { UserNotFoundException } from './exceptions/user-not-found.exception'
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOneBy({
      email: user.email,
    })

    if (existingUser) {
      throw new UserAlreadyExistsException(user.email)
    }

    const newUser = this.userRepository.create(user)
    return await this.userRepository.save(newUser)
  }

  async findOne(id: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new UserNotFoundException(id)
    }

    return user
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async update(
    id: string,
    user: Partial<UserEntity>
  ): Promise<UserEntity | null> {
    await this.userRepository.update(id, user)
    return this.findOne(id)
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id)
    if (!user) {
      throw new UserNotFoundException(id)
    }

    await this.userRepository.delete(id)
  }
}
