import { forwardRef, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'
import { JwtRefreshTokenStrategy } from './jwt-refresh.strategy'

@Module({
    imports: [
        forwardRef(() => UsersModule), 
        PassportModule, 
        ConfigModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: {
              expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`
            }
          })
        })
    ],
    providers: [AuthService, JwtStrategy, JwtRefreshTokenStrategy],
    exports:[AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
