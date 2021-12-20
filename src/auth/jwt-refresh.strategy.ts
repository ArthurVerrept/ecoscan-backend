import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { UsersService } from '../users/users.service'
import TokenPayload from './interface/tokenPayload'
 
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
        passReqToCallback: true
    })
  }
 
  async validate(request: Request, payload: TokenPayload) {
    // get token and remove everything before and including the space
    const refreshToken = request.headers.authorization.split(" ").pop()
    
    // check if token from headers of user id in payload matches
    // the refresh token of user in database
    return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.sub)
  }
}