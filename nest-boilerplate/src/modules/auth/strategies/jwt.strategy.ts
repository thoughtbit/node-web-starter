import { Entity } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.config.core.auth.JWT_SECRET_KEY,
    })
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const entity = await this.authService.validateUser(payload);
    if(!entity) {
      throw new UnauthorizedException('没找到用户.');
    }
    return entity;
  }
}