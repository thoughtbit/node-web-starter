import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @Column()
  alias: string;

  @ManyToMany(type => PostEntity, post => post.tags)
  posts: PostEntity[];
}