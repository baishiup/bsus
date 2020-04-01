import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from './category.entity';
import { JoiValid } from 'src/pipes/joiValidation.pipe';
import * as Joi from '@hapi/joi';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  // 获取分类列表
  @Get()
  getList(
    @Query(
      new JoiValid(
        Joi.object().keys({ pageSize: Joi.number(), current: Joi.number() }),
      ),
    )
    query,
  ): Promise<Array<CategoryEntity>> {
    return this.service.getList(query);
  }

  // 详细
  @Get(':id')
  getDetail(@Param() param) {
    return this.service.getDetail(param.id);
  }

  // 新增
  @Post()
  create(
    @Body(
      new JoiValid(
        Joi.object().keys({
          name: Joi.not('').required(),
          thumb: Joi.string().allow(''),
        }),
      ),
    )
    body,
  ) {
    return this.service.create(body.name, body.thumb);
  }

  // 编辑
  @Put(':id')
  update(
    @Param(new JoiValid(Joi.object().keys({ id: Joi.required() }))) param,
    @Body(
      new JoiValid(
        Joi.object().keys({
          name: Joi.required().not(''),
          thumb: Joi.string().allow(''),
        }),
      ),
    )
    body,
  ) {
    return this.service.update(param.id, body.name, body.thumb);
  }

  // 删除
  @Delete(':id')
  delete(
    @Param(new JoiValid(Joi.object().keys({ id: Joi.required() }))) param,
  ) {
    return this.service.delete(param.id);
  }
}
