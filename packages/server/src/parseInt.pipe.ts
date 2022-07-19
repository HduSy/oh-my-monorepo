import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    const val = parseInt(value)
    if (isNaN(val)) throw new BadRequestException('Validation failed.')
    return val
  }
}
