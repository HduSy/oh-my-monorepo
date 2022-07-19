import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import {Reflector} from '@nestjs/core'

@Injectable()
export class RoleGuard implements CanActivate{
  constructor(private reflector:Reflector) {
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
    return this.matchRoles(roles, user.roles)
  }
  matchRoles(roles: string[], uroles: string[]) {
    // 简单或复杂的处理程序
    return true
  }
}
