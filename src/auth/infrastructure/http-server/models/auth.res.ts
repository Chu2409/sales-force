import { ApiProperty } from '@nestjs/swagger'
import { IAuthRes } from 'src/auth/domain/dtos/auth.res'
import { EmployeeRes } from 'src/employees/infrastructure/http-server/models/employee.res'

export class AuthRes implements IAuthRes {
  @ApiProperty()
  employee: EmployeeRes

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
  token: string
}
