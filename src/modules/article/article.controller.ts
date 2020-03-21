import { Controller, Get, Post, Body } from '@nestjs/common';
import { JoiValid } from 'src/pipes/joiValidation.pipe';
import Joi = require('@hapi/joi');
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}
  @Get()
  getList() {
    return this.service.getList();
  }

  @Post()
  create(
    @Body(
      new JoiValid(
        Joi.object().keys({
          title: Joi.required(),
          category: Joi.string(),
          tag: Joi.string(),
        }),
      ),
    )
    body,
  ) {
    console.log(body);
    return this.service.create(body.title, body.category, body.tag);
  }
}
