import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PostEntity } from '../post/post.entity';
import { CommentEntity } from '../comment/comment.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  user_name: string;

  @Column({ select: false })
  user_pass: string;

  @Column({ length: 100 })
  user_email: string;

  @Column()
  user_url: string;

  @Column({ nullable: true })
  user_image: string;

  @Column('text', { nullable: true })
  user_bio: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ default: 0 })
  user_status: number;

  @OneToMany(type => PostEntity, post => post.user)
  posts: PostEntity[]

  @ManyToMany(type => PostEntity, post => post.liked)
  @JoinColumn()
  voted: PostEntity[]

  @OneToMany(type => CommentEntity, comment => comment.author)
  comments: CommentEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.user_pass = await bcrypt.hash(this.user_pass, 12);
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.user_pass);
  }
}