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

  @Get()
  getList(@Query() query): Promise<Array<CategoryEntity>> {
    return this.service.getList(query);
  }

  @Get(':id')
  getDetail(
    @Param(new JoiValid(Joi.object().keys({ id: Joi.required() })))
    param,
  ) {
    return this.service.getDetail(param.id);
  }

  @Post()
  create(
    @Body(
      new JoiValid(
        Joi.object().keys({ name: Joi.required(), thumb: Joi.string() }),
      ),
    )
    body,
  ) {
    return this.service.create(body.name, body.thumb || '');
  }

  @Put(':id')
  update(
    @Param(new JoiValid(Joi.object().keys({ id: Joi.required() }))) param,
    @Body(
      new JoiValid(
        Joi.object().keys({ name: Joi.required(), thumb: Joi.required() }),
      ),
    )
    body,
  ) {
    return this.service.update(param.id, body.name, body.thumb);
  }

  @Delete(':id')
  delete(
    @Param(new JoiValid(Joi.object().keys({ id: Joi.required() }))) param,
  ) {
    return this.service.delete(param.id);
  }
}
