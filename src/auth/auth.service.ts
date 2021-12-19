import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import User from 'src/users/entities/user.entity'


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, 
        private readonly configService: ConfigService,
    ){}


    public async generateNewAccessToken(refreshToken: string, userId: number) {
        const payload = { sub: userId } 
        const accessToken = this.jwtService.sign(payload, { 
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '180s'
        })

        return { accessToken }
    }


    public getCookiesWithJwtToken(user: User) {
        const payload = { sub: user.id } 
        const accessToken = this.jwtService.sign(payload, { 
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '180s'
        })

        const refreshToken = this.jwtService.sign(payload, { 
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: '31622400s'
        })

        return { accessToken, refreshToken }
    }
}
