import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { configService } from '../config/config.service';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register(configService.getJWTConfig()),
    PassportModule,
    UsersModule,
  ],
  providers: [AuthService, JWTStrategy, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
