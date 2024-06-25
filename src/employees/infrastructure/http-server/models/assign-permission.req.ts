import { ApiProperty } from '@nestjs/swagger'
import { IsArray } from 'class-validator'
import { IAssignPermissionDto } from 'src/employees/domain/dtos/assign-permission.dto'

export class AssignPermissionReq implements IAssignPermissionDto {
  @IsArray()
  @ApiProperty({ type: Number, isArray: true })
  moduleId: number[]
}
