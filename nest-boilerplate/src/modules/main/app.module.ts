import {  APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';
import { ErrorFilter } from '../../common/errors.filter';
import { CatModule } from '../cats/cats.module';
import { PubSubFactory } from './../../pub-sub.provider';
// import { ErrorsInterceptor } from '../../common/errors.interceptor';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['src/**/*.graphql'],
      installSubscriptionHandlers: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.config.db.host,
        port: configService.config.db.port,
        username: configService.config.db.username,
        password: configService.config.db.password,
        database: configService.config.db.database,
        entities: ['src/**/*.entity{.ts,.js}'],
        synchronize: configService.config.db.synchronize,
        logging: configService.config.db.logging
      }),
      inject: [ConfigService],
    }),
    CatModule,
    ConfigModule,
    AuthModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    // { 
    //   provide: APP_INTERCEPTOR,
    //   useClass: ErrorsInterceptor,
    // },
    AppService,
    PubSubFactory,
  ],
})
export class AppModule {}
