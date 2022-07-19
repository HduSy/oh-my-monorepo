import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import {Response,Request} from 'express'
@Catch(HttpException) // 绑定到元数据到该过滤器
export class HttpExceptionFiltter implements ExceptionFilter {
  // 异常对象 exception: T，T：异常类型。
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    response.status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url
      })
  }
}
