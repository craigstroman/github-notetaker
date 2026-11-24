import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Notes } from './notes';

@Entity()
export class User extends BaseEntity {
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
  name!: string;

  @Column(() => String)
  @Column()
  email!: string;

  @Column(() => String)
  @Column()
  provider!: string;

  @Column(() => String)
  @Column()
  profile_picture!: string;

  @OneToMany(() => Notes, (notes) => notes.creator)
  notes!: Notes[];
}
