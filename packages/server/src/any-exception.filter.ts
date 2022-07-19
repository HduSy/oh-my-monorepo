import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Response, Request } from 'express'
@Catch()
export class AllExceptionFilter implements ExceptionFilter{
  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const req = ctx.getRequest<Request>()
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    res.status(status).json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: req.url
    })
  }
}
