import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Auth, google } from 'googleapis'
import { AuthService } from '../auth/auth.service'
import User from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID')
    const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET')
 
    this.oauthClient = new google.auth.OAuth2(
      clientID,
      clientSecret,
      'http://127.0.0.1:5500/google-auth.html'
    )
  }

  async generateAuthUrl() {
    const url = this.oauthClient.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
    
      // If you only need one scope you can pass it as a string
      scope: 'profile email'
    })
    return url
    // get user access and refresh tokens - DONE

    // save them with the user - DONE

    // create function to get user info which take access and refresh tokens - DONE

    // redirect if app access token expires

    // only show sign in if user has signed out/ google refresh token has expired
  }

  async authenticate(authCode: string) {
    try {
      // get access and refresh tokens from google
      const { tokens } = await this.oauthClient.getToken(authCode)

      return await this.getAppTokensForUser(tokens.access_token, tokens.refresh_token)
    } catch {
      throw new UnauthorizedException('Invalid Google grant, go through sign in flow again')
    }
  }

  // this function takes the access and refresh tokens,
  // tries to find the user by email, if he exists return
  // our own access and refresh tokens, else add them to db
  // then return our own access and refresh token
  async getAppTokensForUser(googleAccessToken: string, googleRefreshToken: string) {
    // get email from google using access token
    const tokenInfo = await this.oauthClient.getTokenInfo(googleAccessToken)
    const email = tokenInfo.email
    try {
      // if they exist get access and refresh for this app
      const user = await this.usersService.getByEmail(email)
      return this.handleRegisteredUser(user)
    } catch (error) {
      if (error.status !== 404) {
        throw new error
      }
      
        // if they don't exist get user data from google
        // const userData = await this.getUserData(googleAccessToken)
        // const name = userData.name
        // console.log(userData)


      // add them into db
      const user = await this.usersService.createWithGoogle(email, googleAccessToken, googleRefreshToken)
      
      // get access and refresh for our app
      const { refreshToken, accessToken } = await this.handleRegisteredUser(user)
      
      // save app refresh token to db
      await this.usersService.changeCurrentRefreshToken(user.id, refreshToken)
      
      return { refreshToken, accessToken }
    }
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo
   
    this.oauthClient.setCredentials({
      access_token: token
    })
   
    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient
    })
  
    return userInfoResponse.data
  }

  async handleRegisteredUser(user: User) {
    if (!user.isCreatedWithGoogle) {
      throw new UnauthorizedException()
    }

    return this.authService.getCookiesWithJwtToken(user)
  }
}
