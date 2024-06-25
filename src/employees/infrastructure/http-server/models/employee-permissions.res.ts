import { ApiProperty } from '@nestjs/swagger'
import { IEmployeePermissionsRes } from 'src/employees/domain/dtos/employee-permissions.res'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { ModuleRes } from 'src/modules/infrastructure/http-server/models/module.res'
import { PersonWithLocationRes } from 'src/people/infrastructure/http-server/models/person-with-location.res'

export class EmployeePermissionsRes implements IEmployeePermissionsRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  username: string

  @ApiProperty()
  password: string

  @ApiProperty({ enum: EmployeeRole })
  role: EmployeeRole

  @ApiProperty()
  isActive: boolean

  @ApiProperty()
  person: PersonWithLocationRes

  @ApiProperty({ isArray: true })
  modules: ModuleRes[]
}
