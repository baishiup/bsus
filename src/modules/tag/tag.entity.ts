import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { type } from 'os';
import { ArticleEntity } from '../article/article.entity';

@Entity({
  name: 'tag',
})
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(
    type => ArticleEntity,
    article => article.tag,
  )
  articles: ArticleEntity[];
}
