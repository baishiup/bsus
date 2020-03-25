import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';

@Entity({
  name: 'category',
})
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  thumb: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    type => ArticleEntity,
    atricle => atricle.category,
  )
  articles: ArticleEntity[];
}
