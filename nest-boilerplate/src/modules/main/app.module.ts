import { PostModule } from './../post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.config.db.host,
        port: configService.config.db.port,
        username: configService.config.db.username,
        password: configService.config.db.password,
        database: configService.config.db.database,
        entities: ['src/**/**.entity{.ts,.js}'],
        synchronize: configService.config.db.synchronize,
        logging: configService.config.db.logging
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
