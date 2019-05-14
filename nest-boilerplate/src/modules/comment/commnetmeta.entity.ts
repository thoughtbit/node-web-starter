import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('commentmeta')
export class CommentMetaEntity {
  @PrimaryGeneratedColumn()
  meta_id: number;

  @Column({ default: 0 })
  comment_id: number;

  @Column()
  meta_key: string;

  @Column('longtext', { nullable: true })
  meta_value: string;
}