import { PostModule } from './../post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(),
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
