/* eslint-disable prettier/prettier */
import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseFloatPipe implements PipeTransform {
  transform(value: any) {
    const val = parseFloat(value);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed. Float required.');
    }
    return val;
  }
}
