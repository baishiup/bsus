import { Controller, Get } from '@nestjs/common';
import * as qiniu from 'qiniu';
import { QINIU } from 'src/config';
import { HttpResponse } from 'src/decorators/httpResponse';

@Controller('qiniu')
export class QiniuController {
  @Get('getUploadToken')
  getUploadToken() {
    const mac = new qiniu.auth.digest.Mac(QINIU.ak, QINIU.sk);
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: QINIU.bucket,
    });
    const uploadToken = putPolicy.uploadToken(mac);
    return HttpResponse.success().setMap({ token: uploadToken });
  }
}
