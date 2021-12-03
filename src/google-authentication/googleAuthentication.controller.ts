import { Controller, ClassSerializerInterceptor, UseInterceptors, Body, Req, Res, Post } from '@nestjs/common'
import { Request, Response } from 'express'
import TokenVerificationDto from './dto/token-verification.dto'
import { GoogleAuthenticationService } from './googleAuthentication.service'

@Controller('google-authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
    constructor(private readonly googleAuthenticationService: GoogleAuthenticationService) {}

    @Post()
    async authenticate(@Body() tokenData: TokenVerificationDto, @Req() request: Request, @Res() res: Response) {
    // const {
    //     accessTokenCookie,
    //     refreshTokenCookie,
    //     user
    //   } = await this.googleAuthenticationService.authenticate(tokenData.token)
   
    //   request.headers.set('Set-Cookie', [accessTokenCookie, refreshTokenCookie])
        // console.log(tokenData.token)
        const user = await this.googleAuthenticationService.authenticate(tokenData.token)
        console.log(user)
        return user
    }
}
