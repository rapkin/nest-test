import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { configService } from '../config/config.service';
import { AuthService } from './auth.service';
import UserDto from './dto/user.dto';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      // header `Auth: Bearer some_jwt_token`
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJWTConfig().secret,
    });
  }

  async validate(payload: UserDto) {
    const user = await this.authService.validateUserByNameId(
      payload.name,
      payload.id,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
