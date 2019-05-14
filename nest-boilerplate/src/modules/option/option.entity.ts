import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('option')
export class OptionEntity {
  @PrimaryGeneratedColumn()
  option_id: number;

  @Column()
  option_name: string;

  @Column('longtext', { nullable: true })
  option_value: string;

  @Column()
  autoload: boolean
}