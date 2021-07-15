import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { SettingService } from './setting.service';

@Controller('setting')
export class SettingController {
  constructor(private readonly service: SettingService) {}
  @Get()
  getSetting() {
    return this.service.getSetting();
  }

  @Put()
  setAllSetting(@Body() body) {
    if (Object.keys(body).length > 1) {
      return this.service.batchSetSetting(body);
    } else {
      return this.service.setSetting(body);
    }
  }

  @Get('getWXAccessToken')
  getWXAccessToken() {
    return this.service.getWXAccessToken();
  }

  @Get('getShortUrl')
  getWXShortUrl(@Query() query) {
    return this.service.getWXShortUrl(query);
  }
}
