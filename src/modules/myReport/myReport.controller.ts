import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { genValid } from 'src/pipes/joiValidation.pipe';
import { MyReportService } from './myReport.service';

@Controller('myreport')
export class MyReportController {
  constructor(private readonly service: MyReportService) {}

  @Get()
  getList(@Query() query) {
    return this.service.getList(query);
  }

  @Post('addreport')
  create(
    @Body(
      genValid(joi => ({
        desc: joi.required().not(''),
        date: joi.number().required(),
      })),
    )
    body,
  ) {
    return this.service.create(body);
  }

  @Delete(':id')
  delete(@Param(genValid(joi => ({ id: joi.required() }))) param) {
    return this.service.delete(param.id);
  }

  @Get(':id')
  getDetail(@Param(genValid(joi => ({ id: joi.required() }))) param) {
    return this.service.getDetail(param.id);
  }

  @Put(':id')
  editItem(
    @Param(genValid(joi => ({ id: joi.required() }))) param,
    @Body(genValid(joi => ({ data: joi.required() }))) body,
  ) {
    return this.service.editItem(param.id, body.data);
  }
}
