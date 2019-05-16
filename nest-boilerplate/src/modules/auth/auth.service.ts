import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginPayload } from './payload/login.payload';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginPayload) {
    const user = await this.validateUser(data);
    const { id, user_name, user_email } = user;
    const payload = { id, user_name, user_email };
    const token = this.createToken(payload);
    return {
      ...payload,
      token,
    }
  }

  async createToken(data: JwtPayload) {
    return {
      expiresIn: this.configService.config.core.auth.JWT_EXPIRATION_TIME,
      accessToken: this.jwtService.sign(data),
    };
  }
  
  async validateUser(payload: LoginPayload): Promise<any> {
    const { user_name, user_pass } = payload;
    const user = await this.userService.findByUser(user_name, user_pass);
    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    }

    if (!(await user.comparePassword(payload.user_pass))) {
      throw new UnauthorizedException('密码不匹配。');
    }
    return user;
  }
}