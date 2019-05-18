import { User } from './../../core/decorators/user.decorators';
import { Controller, Body, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPayload } from './payload/login.payload';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { RegisterPayload } from './payload/register.payload';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
@ApiUseTags('认证')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }
  
  @ApiOperation({ title: '用户登录' })
  @ApiResponse({ status: 201, description: '登录成功' })
  @ApiResponse({ status: 400, description: '登录失败' })
  @ApiResponse({ status: 401, description: '用户没有权限登录' })
  @Post('login')
  async login(@Body() payload: LoginPayload): Promise<any> {
    return await this.authService.login(payload);
  }

  @ApiOperation({ title: '用户注册' })
  @ApiResponse({ status: 201, description: '注册成功' })
  @ApiResponse({ status: 400, description: '注册失败' })
  @ApiResponse({ status: 401, description: '用户没有权限注册' })
  @Post('register')
  async register(@Body() payload: RegisterPayload): Promise<any> {
    const { id, user_name } = await this.userService.create(payload);
    const data = { id, user_name };
    return await this.authService.createToken(data);
  }


  @Get('test')
  @UseGuards(AuthGuard())
  async authTest(@User() user) {
    console.log('user:', user);

    return {
      message: 'ok'
    }
  }
}
