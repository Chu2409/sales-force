import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Employee } from '@prisma/client'
import { Observable } from 'rxjs'
import { ROLES_METADATA } from 'src/auth/shared/auth.conts'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      ROLES_METADATA,
      context.getHandler(),
    )

    if (!validRoles || validRoles.length === 0) return true

    const req = context.switchToHttp().getRequest()
    const employee = req.user as Employee

    if (!employee) throw new BadRequestException('Employee not found')

    if (validRoles.includes(employee.role)) {
      return true
    }

    throw new ForbiddenException(
      `Employee with id: ${employee.id} need a valid role: [${validRoles}]`,
    )
  }
}
