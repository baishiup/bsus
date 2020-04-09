import { Controller, Get } from '@nestjs/common';
import { QQmusicService } from './qqmusic.service';

@Controller('qqmusic')
export class QQmusicController {
  constructor(private readonly service: QQmusicService) {}
  @Get('getList')
  getList() {
    return this.service.getList();
  }

  @Get('refreshMusicList')
  refreshMusicList() {
    return this.service.getListFromQQmusic();
  }
}
