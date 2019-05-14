import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TagEntity } from "../tag/tag.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, TagEntity]),
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule{}