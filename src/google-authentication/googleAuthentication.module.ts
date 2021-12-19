import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '../auth/auth.module'
import { UsersModule } from '../users/users.module'
import { GoogleAuthenticationController } from './googleAuthentication.controller'
import { GoogleAuthenticationService } from './googleAuthentication.service'

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule,
    AuthModule
  ],
  controllers: [GoogleAuthenticationController],
  providers: [GoogleAuthenticationService],
  exports: [GoogleAuthenticationService]
})
export class GoogleAuthenticationModule {}
