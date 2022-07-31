import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Optional,
  Param,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'
import { AuthGuard } from '../auth.guard'
import { HttpExceptionFiltter } from '../http-exception.filtter'
import { JoiValidatePipe } from '../joiValidate.pipe'
import { LoggingInterceptor } from '../logging.interceptor'
import { ParseIntPipe } from '../parseInt.pipe'
import { Roles } from '../roles.decorator'
import { CatsService } from './cats.service'
import { CreateCatDto, CreateCatSchema } from './dto/create-cats.dto'
import { Cat } from './interfaces/cats.interface'

@Controller('cats')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(@Optional() private readonly catsService: CatsService) {} // 可选 provider
  @Get() // 该装饰器创建了一个路由路径端点将指定请求映射到该处理程序
  @HttpCode(204)
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll()
  }
  @Post() // payload
  @Header('Cache-Control', 'none')
  @UseFilters(HttpExceptionFiltter)
  @UsePipes(new JoiValidatePipe(CreateCatSchema))
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto)
  }
  @Get('/error')
  testError() {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    throw new HttpException(
      {
        code: HttpStatus.FORBIDDEN,
        message: 'This is a custom message.',
      },
      HttpStatus.FORBIDDEN,
    )
  }
  // 路由参数
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return `This action returns a #${id} cat`
  }
  @Delete(':id')
  remove(@Param('id') id) {
    return `This action removes a #${id} cat`
  }
}
