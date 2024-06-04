import { applyDecorators, UseGuards } from '@nestjs/common'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { RoleProtected } from './role-protected.decorator'
import { AuthGuard } from '@nestjs/passport'
import { UserRoleGuard } from '../guards/user-role.guard'

export const Auth = (...roles: EmployeeRole[]) => {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  )
}
