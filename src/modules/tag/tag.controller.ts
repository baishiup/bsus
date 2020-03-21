import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { TagService } from './tag.service';
import { JoiValid } from 'src/pipes/joiValidation.pipe';
import Joi = require('@hapi/joi');

@Controller('tag')
export class TagController {
  constructor(private readonly service: TagService) {}

  @Get()
  getList() {
    return this.service.getList();
  }

  @Post()
  create(
    @Body(new JoiValid(Joi.object().keys({ name: Joi.required() }))) body,
  ) {
    return this.service.create(body.name);
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
