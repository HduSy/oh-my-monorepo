import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsController } from './cats/cats.controller'
import { CatsModule } from './cats/cats.module'
import { CatsService } from './cats/cats.service'
import { LoggerMiddleware } from './logger.middleware'

@Module({
  imports: [CatsModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({
        // 排除指定路由请求方法
        path: 'cats',
        method: RequestMethod.POST,
      })
      .forRoutes({
        path: 'cats',
        method: RequestMethod.GET,
      })
  }
}
