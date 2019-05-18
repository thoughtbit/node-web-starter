import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

/**
 * 用户登录成功后，返回的 data 是授权令牌；
 * 在调用有 @UseGuards(AuthGuard()) 注解的路由时，会检查当前请求头中是否包含 Authorization: Bearer xxx 授权令牌，
 * 其中 Authorization 是用于告诉服务端本次请求有令牌，并且令牌前缀是 Bearer，而令牌的具体内容是登录之后返回的 data(accessToken)。
 */
@ApiBearerAuth()
@ApiUseTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard())
  @Get(':email')
  async findMe(@Param('email') email: string) {
    const user = await this.userService.getUserByEmail(email);
    return user;
  }
}