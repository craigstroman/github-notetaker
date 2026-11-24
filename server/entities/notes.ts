import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Notes extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Column(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  @Column(() => String)
  @Column()
  repo!: string;

  @Column(() => String)
  @Column()
  text!: string;

  @ManyToOne(() => User, (user) => user.notes)
  creator!: User;
}
