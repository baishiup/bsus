import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SettingEntity } from './setting.entity';
import { WX } from '../../config';
import axios from 'axios';

@Injectable()
export class SettingService {
  constructor(
    @Inject(__dirname) private readonly Repo: Repository<SettingEntity>,
  ) {}
  async getSetting() {
    const res = await this.Repo.find();
    return res.reduce((a, b) => {
      a[b.name] = b.data;
      return a;
    }, {});
  }

  async setSetting(data) {
    const key = Object.keys(data)[0];
    const record = await this.Repo.findOne({ name: key });
    record.data = data[key];
    return await this.Repo.save(record);
  }

  async batchSetSetting(data: Record<string, string>) {
    const insertValues = Object.keys(data)
      .map(x => `('${x}','${data[x]}')`)
      .join(',');
    const query = `INSERT INTO setting (\`name\`,\`data\`) VALUES ${insertValues} 
    ON DUPLICATE KEY UPDATE \`name\` = VALUES(\`name\`),\`data\` = VALUES(\`data\`)`;
    return await this.Repo.query(query);
  }

  async getWXAccessToken() {
    let wxAccessToken = await this.Repo.findOne({ name: 'wxAccessToken' });
    let wxExpiresTime = await this.Repo.findOne({ name: 'wxExpiresTime' });
    const now = new Date().valueOf();

    // 有效期内
    if (wxExpiresTime && Number(wxExpiresTime.data) >= now) {
      return wxAccessToken.data;
    }

    // 获取
    const res = await axios.get(
      `https://api.weixin.qq.com/cgi-bin/token?appid=${WX.appid}&secret=${WX.secret}&grant_type=client_credential`,
    );

    if (res.data.errcode) {
      throw new BadRequestException(res.data);
    }

    if (wxAccessToken === undefined) {
      wxAccessToken = new SettingEntity();
      wxAccessToken.name = 'wxAccessToken';
      wxExpiresTime = new SettingEntity();
      wxExpiresTime.name = 'wxExpiresTime';
    }

    wxAccessToken.data = res.data.access_token;
    wxExpiresTime.data = String(now + res.data.expires_in * 1000);

    await this.Repo.save(wxAccessToken);
    await this.Repo.save(wxExpiresTime);
    return wxAccessToken.data;
  }

  async getWXShortUrl({ url }) {
    const wxAccessToken = await this.getWXAccessToken();
    const res = await axios.get(
      `https://api.weixin.qq.com/cgi-bin/shorturl?access_token=${wxAccessToken}&action=long2short&long_url=${url}`,
    );
    return res.data;
  }
}
