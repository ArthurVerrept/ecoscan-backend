import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Auth, google } from 'googleapis'
import User from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    // private readonly authenticationService: AuthenticationService
  ) {
    const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID')
    const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET')
 
    this.oauthClient = new google.auth.OAuth2(
      clientID,
      clientSecret
    )
  }

  async authenticate(token: string) {
    // Verify the integrity of the ID token
    // verify a few conditions of the token with google
    // conditions can be read here
    // hhttps://developers.google.com/identity/sign-in/web/backend-auth#verify-the-integrity-of-the-id-token
    const tokenInfo = await (await this.oauthClient.verifyIdToken({ idToken: token, audience: this.oauthClient._clientId })).getPayload()
    
    // since above we used getPayload() that returns us basic user info
    const email = tokenInfo.email
    const name = tokenInfo.name
 
    // if we can get the user by email
    try {
      const user = await this.usersService.getByEmail(email)
      
      // sign them in and create session
      return this.handleRegisteredUser(user)
    // otherwise create them a user
    } catch (error) {
      if (error.status !== 404) {
        throw new error
      }
      const user = await this.usersService.createWithGoogle(name, email)
   
      // then sign them in and create session
      return this.handleRegisteredUser(user)
    }
  }

  // TODO: sessions
  async handleRegisteredUser(user: User) {
    if (!user.isCreatedWithGoogle) {
      throw new UnauthorizedException()
    }
    // do jwt shit here
    console.log('handle here')
    return user
  }

  // async getCookiesForUser(user: User) {
  //   const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.id)
  //   const {
  //     cookie: refreshTokenCookie,
  //     token: refreshToken
  //   } = this.authenticationService.getCookieWithJwtRefreshToken(user.id)
   
  //   await this.usersService.setCurrentRefreshToken(refreshToken, user.id)
   
  //   return {
  //     accessTokenCookie,
  //     refreshTokenCookie
  //   }
  // }
}