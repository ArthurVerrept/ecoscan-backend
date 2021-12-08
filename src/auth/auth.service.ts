import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import User from 'src/users/entities/user.entity'


@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService){}


    public getCookieWithJwtToken(user: User) {
        const payload = { name: user.name, sub: user.id } // TODO: check token payload type
        const token = this.jwtService.sign(payload)
        return token
    }
}
