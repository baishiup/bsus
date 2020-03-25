import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { TagEntity } from '../tag/tag.entity';
import { PublishState } from 'src/interfaces';

@Entity({
  name: 'article',
})
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  thumb: string;

  @Column({
    comment: 'markdown代码',
    type: 'text',
    nullable: true,
  })
  code: string;

  @Column({
    comment: '通过markdown转换的html代码',
    type: 'text',
    nullable: true,
  })
  html: string;

  @Column({
    nullable: true,
  })
  keywords: string;

  @Column({
    type: 'enum',
    enum: PublishState,
  })
  state: PublishState;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    type => CategoryEntity,
    category => category.articles,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @ManyToMany(
    type => TagEntity,
    tag => tag.articles,
  )
  @JoinTable()
  tag: TagEntity[];
}
