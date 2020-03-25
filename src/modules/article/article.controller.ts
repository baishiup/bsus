import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { genValid } from 'src/pipes/joiValidation.pipe';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}
  // 获取列表
  @Get()
  getList(@Query() query) {
    return this.service.getList(query);
  }

  //获取详情
  @Get(':id')
  getDetail(@Param(genValid(joi => ({ id: joi.required() }))) param) {
    return this.service.getDetail(param.id);
  }

  // 新增
  @Post()
  create(
    @Body(
      genValid(joi => ({
        title: joi.required().not(''),
        description: joi.string().allow(''),
        thumb: joi.allow(''),
        code: joi.string().allow(''),
        keywords: joi.string().allow(''),
        category: joi.number().allow(''),
        tag: joi.string().allow(''),
        state: joi.number().required(),
      })),
    )
    body,
  ) {
    return this.service.create(body);
  }

  // 编辑
  @Put(':id')
  update(
    @Param(genValid(joi => ({ id: joi.required() })))
    param,
    @Body(
      genValid(joi => ({
        title: joi.required().not(''),
        description: joi.string().allow(''),
        thumb: joi.allow(''),
        code: joi.string().allow(''),
        keywords: joi.string().allow(''),
        category: joi.number().allow(''),
        tag: joi.string().allow(''),
        state: joi.number().required(),
      })),
    )
    body,
  ) {
    return this.service.update(param.id, body);
  }

  // 删除
  @Delete(':id')
  delete(
    @Param(genValid(joi => ({ id: joi.required() })))
    param,
  ) {
    return this.service.delete(param.id);
  }
}
