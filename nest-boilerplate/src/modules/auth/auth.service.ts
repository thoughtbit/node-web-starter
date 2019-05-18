import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
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

  async login(payload: LoginPayload) {
    const { user_name, user_pass } = payload;
    const user = await this.userService.findByUser(user_name, true);

    if (!user) {
      throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST);
    }

    if (!(await user.comparePassword(user_pass))) {
      throw new HttpException('密码不匹配', HttpStatus.BAD_REQUEST);
    }  

    const { id } = user;
    const data = { id, user_name };
    const token = await this.createToken(data);
    return {
      ...data,
      token,
    }
  }

  async createToken(payload: JwtPayload) {
    return {
      expiresIn: this.configService.config.core.auth.JWT_EXPIRATION_TIME,
      accessToken: this.jwtService.sign(payload),
    };
  }
  
  async validateUser(payload: JwtPayload): Promise<any> {
    console.log('validateUser -> payload:', payload);
    const { user_name } = payload;
    return await this.userService.getUserByName(user_name);
  }
}