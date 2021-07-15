import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'myReport',
})
export class MyReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '备注',
    nullable: true,
  })
  desc: string;

  @Column({
    comment: '日期时间戳',
    type: 'bigint',
  })
  date: number;

  @Column({
    comment: '数据',
    type: 'text',
  })
  data: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
