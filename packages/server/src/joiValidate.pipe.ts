import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { ObjectSchema } from 'joi'

@Injectable()
export class JoiValidatePipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  // 管道必须实现的方法
  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value)
    if (error) {
      throw new BadRequestException('Validation failed')
    }
    return value
  }
}
