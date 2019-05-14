import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, ManyToOne, ManyToMany, OneToMany, JoinTable, JoinColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from '../comment/comment.entity';
import { TagEntity } from '../tag/tag.entity';
import { CategoryEntity } from '../category/category.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({default: ''})
  description: string;

  @Column('longtext', { nullable: true })
  body: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date;
  }

  @ManyToOne(type => UserEntity, user => user.posts)
  user: UserEntity;

  @ManyToMany(type => UserEntity, user => user.voted)
  liked: UserEntity[];

  @OneToMany(type => CommentEntity, comment => comment.post)
  @JoinColumn()
  comments: CommentEntity[];

  @ManyToMany(type => TagEntity, tag => tag.posts)
  @JoinColumn()
  tags: TagEntity[];

  @ManyToOne(type => CategoryEntity, category => category.posts)
  category: CategoryEntity

  @Column({default: 0})
  favoriteCount: number;
}