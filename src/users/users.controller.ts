import { Controller, ForbiddenException, Get, Param, ParseIntPipe, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import JwtAuthGuard from '../auth/jwt-auth.guard'
import { GetUserDto } from './dto/getGoogleUser.dto'
// import { Request } from 'express'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getGoogleUser(@Request() req): Promise<GetUserDto> {
    // TODO: come back to Number(id) look at pipes documentation
    return await this.usersService.getUser(req.user.id)
  }
}
