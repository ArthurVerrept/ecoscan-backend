import { Controller, ClassSerializerInterceptor, UseInterceptors, Body, Post } from '@nestjs/common'
import TokenVerificationDto from './dto/token-verification.dto'
import { GoogleAuthenticationService } from './googleAuthentication.service'

@Controller('google-authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
    constructor(private readonly googleAuthenticationService: GoogleAuthenticationService) {}

    @Post()
    async authenticate(@Body() tokenData: TokenVerificationDto) {
        // https://github.com/dwyl/hapi-auth-jwt2/issues/82#issuecomment-129873082
         const token = await this.googleAuthenticationService.authenticate(tokenData.token)
         return { token }
    }
}
