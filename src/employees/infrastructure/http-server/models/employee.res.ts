import { ApiProperty } from '@nestjs/swagger'
import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { PersonWithLocationRes } from 'src/people/infrastructure/http-server/models/person-with-location.res'

export class EmployeeRes implements IEmployeeRes {
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
}
