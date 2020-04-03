import { Controller, Get, Put, Body } from '@nestjs/common';
import { SettingService } from './setting.service';
import { genValid } from 'src/pipes/joiValidation.pipe';

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
}
