import { forwardRef, HttpException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import User from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, 
        private readonly configService: ConfigService,
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

    ){}


    public async generateNewAccessToken(userId: number) {
        const payload = { sub: userId } 
        const accessToken = this.jwtService.sign(payload, { 
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '180s'
        })

        try {
            // returning email so ryan can add to keychain
            const user = await this.usersService.getUser(userId)
            return { accessToken, email: user.email }
        } catch {
            // if token has been revoked through google it means that user
            // it will fail into here where we return a specific 400 to tell
            // the client to redirect
            throw new HttpException({ error_description: 'Google refresh token revoked, sign in again', error: 'invalid_grant' }, 400)
        }
    }


    public getCookiesWithJwtToken(user: User) {
        const payload = { sub: user.id } 
        const accessToken = this.jwtService.sign(payload, { 
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}s`
        })

        const refreshToken = this.jwtService.sign(payload, { 
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: '31622400s'
        })

        return { accessToken, refreshToken }
    }
}
