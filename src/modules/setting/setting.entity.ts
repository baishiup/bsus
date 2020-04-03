import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'setting',
})
export class SettingEntity {
  @PrimaryColumn({
    comment: '参数名',
  })
  name: string;

  @Column({
    comment: '参数值',
    type: 'text',
  })
  data: string;
}
