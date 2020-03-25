import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { JoiValid } from 'src/pipes/joiValidation.pipe';
import Joi = require('@hapi/joi');

@Controller('tag')
export class TagController {
  constructor(private readonly service: TagService) {}

  @Get()
  getList(@Query() query) {
    return this.service.getList(query);
  }

  @Post()
  create(
    @Body(new JoiValid(Joi.object().keys({ name: Joi.required().not('') })))
    body,
  ) {
    return this.service.create(body.name);
  }

  @Put(':id')
  update(
    @Param(new JoiValid(Joi.object().keys({ id: Joi.required() }))) param,
    @Body(new JoiValid(Joi.object().keys({ name: Joi.required().not('') })))
    body,
  ) {
    return this.service.update(param.id, body.name);
  }

  @Delete(':id')
  delete(
    @Param(
      new JoiValid(
        Joi.object().keys({
          id: Joi.required(),
        }),
      ),
    )
    param,
  ) {
    return this.service.delete(param.id);
  }
}
