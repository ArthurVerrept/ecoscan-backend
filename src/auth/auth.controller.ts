import { Controller, Post, UseGuards, Request } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { AuthService } from './auth.service'
import JwtAuthGuard from './jwt-auth.guard'
import JwtRefreshGuard from './jwt-refresh.guard'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ){}

    @UseGuards(JwtRefreshGuard)
    @Post('refresh-token')
    async refreshToken(@Request() req) {
        return await this.authService.generateNewAccessToken(req.refreshToken, req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Request() req) {
        return await this.usersService.logout(req.user.id)
    }
}
