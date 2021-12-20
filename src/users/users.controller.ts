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
  @Get('/:id')
  async getGoogleUser(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<GetUserDto> {
    // TODO: come back to Number(id) look at pipes documentation
    if (req.user.id !== id) {
      throw new ForbiddenException()
    }
    return await this.usersService.getUser(id)
  }
}
