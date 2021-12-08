import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import JwtAuthGuard from 'src/auth/jwt-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import User from './entities/user.entity'
// import { Request } from 'express'
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
  async getUserById(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<User> {
    // TODO: come back to Number(id) look at pipes documentation
    if (req.user.id !== id) {
      throw new ForbiddenException()
    }
    
    return await this.usersService.getOneById(id)
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(body)
  }

  @Post(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto): Promise<User> {
    // if you send something to update
    if (body) {
      return await this.usersService.updateUser(id, body)
    } else {
      // TODO: come back to Number(id) look at pipes documentation
      return await this.usersService.getOneById(id)
    }
  }
}
