import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Auth, google } from 'googleapis'
import { AuthService } from '../auth/auth.service'
import User from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

// TODO: Handle google refresh token expiry 
// TODO: Handle app token expiry

@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
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

  generateAuthUrl() {
    const url = this.oauthClient.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',

      scope: ['profile', 'email']
    })
    
    return url
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
        
        // if the refresh token has been revoked set the new got from signing in
        if (googleRefreshToken) {
          this.usersService.changeGoogleRefreshToken(user.id, googleRefreshToken)
        }

        // get JWT tokens
        const { refreshToken, accessToken } = await this.handleRegisteredUser(user)
        
        // save app refresh token to db
        await this.usersService.changeCurrentRefreshToken(user.id, refreshToken)
  
  
        return { refreshToken, accessToken }
  
      } catch (error) {
        
        if (error.status !== 404) {
          throw new error
        }
  
        // add them into db
        const user = await this.usersService.createWithGoogle(email, googleRefreshToken)
        
        // get access and refresh for our app
        const { refreshToken, accessToken } = await this.handleRegisteredUser(user)
        
        // save app refresh token to db
        await this.usersService.changeCurrentRefreshToken(user.id, refreshToken)
        
        return { refreshToken, accessToken }
      }
  }

  async getUserData(googleRefreshToken: string) {
    const userInfoClient = google.oauth2('v2').userinfo
    
    this.oauthClient.setCredentials({
      refresh_token: googleRefreshToken
    })
    
    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient
    })
    
    // make a specific response so in the future if there
    // are more oath2 providers theres consistency in the
    // getUserData response
    const returnObj = {
      email: userInfoResponse.data.email,
      name: userInfoResponse.data.name,
      picture: userInfoResponse.data.picture
    }

    return returnObj
  }

  async handleRegisteredUser(user: User) {
    if (!user.isCreatedWithGoogle) {
      throw new UnauthorizedException()
    }

    return this.authService.getCookiesWithJwtToken(user)
  }
}
