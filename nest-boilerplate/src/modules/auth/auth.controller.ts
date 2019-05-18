import { Controller, Body, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPayload } from './payload/login.payload';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { RegisterPayload } from './payload/register.payload';


@Controller('auth')
@ApiUseTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('login')
  @ApiResponse({ status: 201, description: '登录成功' })
  @ApiResponse({ status: 400, description: '登录失败' })
  @ApiResponse({ status: 401, description: '用户没有权限登录' })
  async login(@Body() payload: LoginPayload): Promise<any> {
    return await this.authService.login(payload);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: '注册成功' })
  @ApiResponse({ status: 400, description: '注册失败' })
  @ApiResponse({ status: 401, description: '用户没有权限注册' })
  async register(@Body() payload: RegisterPayload): Promise<any> {
    const { id, user_name } = await this.userService.create(payload);
    const data = { id, user_name };
    return await this.authService.createToken(data);
  }
}
