import { Controller, ClassSerializerInterceptor, UseInterceptors, Body, Post, UnauthorizedException } from '@nestjs/common'
import GoogleAuthCodeDto from './dto/google-data.dto'
import { GoogleAuthenticationService } from './googleAuthentication.service'

@Controller('google-authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
    constructor(private readonly googleAuthenticationService: GoogleAuthenticationService) {}

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
