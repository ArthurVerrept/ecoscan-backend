import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from 'src/users/users.module'
import { GoogleAuthenticationController } from './googleAuthentication.controller'
import { GoogleAuthenticationService } from './googleAuthentication.service'

@Module({
  imports: [
    UsersModule,
    ConfigModule
  ],
  controllers: [GoogleAuthenticationController],
  providers: [GoogleAuthenticationService]
})
export class GoogleAuthenticationModule {}
