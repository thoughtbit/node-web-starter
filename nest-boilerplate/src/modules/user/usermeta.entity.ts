import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usermeta')
export class UserMetaEntity {
  @PrimaryGeneratedColumn()
  meta_id: number;

  @Column({ default: 0 })
  user_id: number;

  @Column()
  meta_key: string;

  @Column('longtext', { nullable: true })
  meta_value: string;
}