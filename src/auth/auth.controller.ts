import { Controller, Post, UseGuards, Request, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import JwtRefreshGuard from './jwt-refresh.guard'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(JwtRefreshGuard)
    @Post('refresh-token')
    async refreshToken(@Request() req) {
        // https://github.com/dwyl/hapi-auth-jwt2/issues/82#issuecomment-129873082
        return await this.authService.generateNewAccessToken(req.refreshToken, req.user.id)
    }
}
