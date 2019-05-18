import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    // 向 nest 容器注册 jwt 模块，并配置密钥和令牌有效期
    JwtModule.registerAsync({
      imports: [
        ConfigModule,
      ],
      useFactory: async (configService: ConfigService) => {
        return {
          secretOrPrivateKey: configService.config.core.auth.JWT_SECRET_KEY,
          signOptions: {
            expiresIn: configService.config.core.auth.JWT_EXPIRATION_TIME,
          },
        };
      },
      inject: [
        ConfigService,
      ],
    }),
    // 向用户模块注册 passport，并配置默认策略为 jwt，因为覆盖了默认的策略，所以要在每个使用 @AuthGuard() 的模块导入 PassportModule
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
})
export class AuthModule {}