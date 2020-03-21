import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { TagEntity } from '../tag/tag.entity';

enum State {
  PUBLISH = '1',
  DRAFT = '2',
}

@Entity({
  name: 'article',
})
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  title: string;

  @Column({
    default: '',
  })
  description: string;

  @Column({
    default: '',
  })
  thumb: string;

  @Column({
    comment: 'markdown代码',
    default: '',
  })
  code: string;

  @Column({
    comment: '通过markdown转换的html代码',
    default: '',
  })
  html: string;

  @Column({
    default: '',
  })
  keywords: string;

  @Column({
    type: 'enum',
    enum: State,
    default: State.PUBLISH,
  })
  state: State;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    type => CategoryEntity,
    category => category.articles,
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
