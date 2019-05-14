import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from 'typeorm';
// import { PostEntity } from './post.entity';
// import { TagEntity } from "../tag/tag.entity";

@Injectable()
export class PostService {
  constructor(
    // @InjectRepository(PostEntity)
    // private readonly postRepository: Repository<PostEntity>,

    // @InjectRepository(TagEntity)
    // private readonly tagRepository: Repository<TagEntity>
  ) {}

  async index() {
    // const queryBuilder = await this.postRepository.createQueryBuilder('post');
    // console.log('queryBuilder', queryBuilder);
    return '';
  }
}