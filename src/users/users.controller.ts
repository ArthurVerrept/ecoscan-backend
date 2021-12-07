import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import JwtAuthGuard from 'src/auth/jwt-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import User from './entities/user.entity'
import { Request } from 'express'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string, @Req() req: Request): Promise<User> {
    console.log(req.user)
    // TODO: come back to Number(id) look at pipes documentation
    return await this.usersService.getOneById(Number(id))
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(body)
  }

  @Post(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto): Promise<User> {
    // if you send something to update
    if (body) {
      return await this.usersService.updateUser(Number(id), body)
    } else {
      // TODO: come back to Number(id) look at pipes documentation
      return await this.usersService.getOneById(Number(id))
    }
  }
}
