import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from 'src/auth/auth.module'
import { UsersModule } from 'src/users/users.module'
import { GoogleAuthenticationController } from './googleAuthentication.controller'
import { GoogleAuthenticationService } from './googleAuthentication.service'

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    AuthModule
  ],
  controllers: [GoogleAuthenticationController],
  providers: [GoogleAuthenticationService]
})
export class GoogleAuthenticationModule {}
