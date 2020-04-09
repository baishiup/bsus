import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'qqmusic',
})
export class QQmusicEntity {
  @PrimaryColumn()
  name: string;

  @Column({
    comment: '数据',
    type: 'text',
    nullable: true,
  })
  data: string;
}
