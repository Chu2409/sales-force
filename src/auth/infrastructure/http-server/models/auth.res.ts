import { ApiProperty } from '@nestjs/swagger'
import { IAuthRes } from 'src/auth/domain/dtos/auth.res'
import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'

export class AuthRes implements IAuthRes {
  employee: IEmployeeRes

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
  token: string
}
