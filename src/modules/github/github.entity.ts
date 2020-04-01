import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'github',
})
export class GithubEntity {
  @PrimaryColumn()
  name: string;

  @Column({
    comment: '数据',
    type: 'text',
    nullable: true,
  })
  data: string;
}
