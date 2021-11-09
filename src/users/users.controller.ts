import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import User from './entities/user.entity'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getAll()
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.findById(Number(id))
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.userService.createUser(body)
  }

  @Post()
  async updateUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.userService.updateUser(body)
  }
}
