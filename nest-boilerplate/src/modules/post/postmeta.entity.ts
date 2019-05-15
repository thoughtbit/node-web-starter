import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('postmeta')
export class PostMetaEntity {
  @PrimaryGeneratedColumn()
  meta_id: number;

  @Column({ default: 0 })
  post_id: number;

  @Column()
  meta_key: string;

  @Column('text', { nullable: true })
  meta_value: string;
}