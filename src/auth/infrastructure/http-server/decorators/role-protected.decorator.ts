import { SetMetadata } from '@nestjs/common'
import { ROLES_METADATA } from 'src/auth/shared/auth.conts'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'

export const RoleProtected = (...roles: EmployeeRole[]) => {
  return SetMetadata(ROLES_METADATA, roles)
}
