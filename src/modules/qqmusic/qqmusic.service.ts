import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QQmusicEntity } from './qqmusic.entity';
import Axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class QQmusicService {
  constructor(
    @Inject(__dirname) private readonly Repo: Repository<QQmusicEntity>,
  ) {}
  async getList() {
    return await this.Repo.findOne({ name: 'list' }).then(res => {
      return JSON.parse(res.data);
    });
  }

  async getListFromQQmusic() {
    const { data } = await Axios.get(
      'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
      {
        params: {
          g_tk: 5381,
          uin: 0,
          format: 'json',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1,
          new_format: 1,
          pic: 500,
          disstid: 949153614, // 歌单id
          type: 1,
          json: 1,
          utf8: 1,
          onlysong: 1,
          picmid: 1,
          nosign: 1,
          song_begin: 0,
          song_num: 50,
        },
        headers: {
          referer: 'https://y.qq.com/portal/profile.html',
        },
      },
    );
    if (!data) {
      console.log('error---- getqqmusic list');
      return;
    }
    const newList = new QQmusicEntity();
    newList.name = 'list';
    newList.data = JSON.stringify(
      data.songlist.map(x => ({
        id: x.id,
        mid: x.mid,
        title: x.title,
        pay_play: x.pay.pay_play,
        singer: x.singer.map(x => x.title).join(','),
      })),
    );
    return await this.Repo.save(newList);
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  handleListTask() {
    console.log('------------schedule-----handleListTask------');
    this.getListFromQQmusic();
  }
}
