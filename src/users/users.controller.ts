import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import User from './entities/user.entity'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    // TODO: come back to Number(id) look at pipes documentation
    return await this.userService.findOneById(Number(id))
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.userService.createUser(body)
  }

  @Post(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<User> {
    // if you send something to update
    if (body) {
      return await this.userService.updateUser(Number(id), body)
    } else {
      // TODO: come back to Number(id) look at pipes documentation
      return await this.userService.findOneById(Number(id))
    }
  }
}
