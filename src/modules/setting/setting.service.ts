import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SettingEntity } from './setting.entity';

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
    console.log(data);
    const insertValues = Object.keys(data)
      .map(x => `('${x}','${data[x]}')`)
      .join(',');
    const query = `INSERT INTO setting (\`name\`,\`data\`) VALUES ${insertValues} 
    ON DUPLICATE KEY UPDATE \`name\` = VALUES(\`name\`),\`data\` = VALUES(\`data\`)`;
    console.log(query);
    return await this.Repo.query(query);
  }
}
