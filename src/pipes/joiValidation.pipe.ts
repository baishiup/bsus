import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import Joi = require('@hapi/joi');

const schemaOption = {
  allowUnknown: true,
  // stripUnknown: true,
  abortEarly: true,
};

@Injectable()
export class JoiValid implements PipeTransform {
  constructor(private readonly schema: Record<string, any>) {}
  transform(value: any) {
    const { error } = this.schema.validate(value, schemaOption);
    if (error) {
      throw new BadRequestException(error);
    }
    return value;
  }
}
const baseSchema = Joi.object().keys();
export function genValid(selfRules) {
  return new JoiValid(baseSchema.keys(selfRules(Joi)));
}
