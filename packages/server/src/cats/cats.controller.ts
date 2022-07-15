import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Optional,
  Param,
  Post,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cats.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cats.interface';

@Controller('cats')
export class CatsController {
  constructor(@Optional() private readonly catsService: CatsService) {} // 可选 provider
  @Get() // 该装饰器创建了一个路由路径端点将指定请求映射到该处理程序
  @HttpCode(204)
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  @Post() // payload
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }
  // 路由参数
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }
  @Delete(':id')
  remove(@Param('id') id) {
    return `This action removes a #${id} cat`;
  }
}
