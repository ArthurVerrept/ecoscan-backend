import { Controller, ClassSerializerInterceptor, UseInterceptors, Body, Post, Request, UnauthorizedException, Get, UseGuards, Param, ParseIntPipe, ForbiddenException } from '@nestjs/common'
import JwtAuthGuard from 'src/auth/jwt-auth.guard'
import GoogleAuthCodeDto from './dto/google-data.dto'
import { GoogleAuthenticationService } from './googleAuthentication.service'

@Controller('google-authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
    constructor(private readonly googleAuthenticationService: GoogleAuthenticationService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/users/:id')
    async getGoogleUser(@Param('id', ParseIntPipe) id: number, @Request() req) {
      // TODO: come back to Number(id) look at pipes documentation
      if (req.user.id !== id) {
        throw new ForbiddenException()
      }
      
      return await this.googleAuthenticationService.getGoogleUser(id)
    }
    @Post('get-authorization-url')
    async generateAuthUrl() {
        // https://github.com/dwyl/hapi-auth-jwt2/issues/82#issuecomment-129873082
         return await this.googleAuthenticationService.generateAuthUrl()
    }

    @Post('login')
    async authenticate(@Body() body: GoogleAuthCodeDto) {
        if (!body.code) {
            throw new UnauthorizedException('Only access this endpoint from google redirect, sign in again')
        }
        // https://github.com/dwyl/hapi-auth-jwt2/issues/82#issuecomment-129873082
        return await this.googleAuthenticationService.authenticate(body.code)
    }
}
