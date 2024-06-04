import { IsPositive } from 'class-validator'
import { IAssignPermissionDto } from 'src/employees/domain/dtos/assign-permission.dto'

export class AssignPermissionReq implements IAssignPermissionDto {
  @IsPositive()
  moduleId: number
}
