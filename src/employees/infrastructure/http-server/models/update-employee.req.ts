import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateEmployeeReq } from './create-employee.req'
import { IUpdateEmployeeDto } from 'src/employees/domain/dtos/update-employee.dto'
import { ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { UpdatePersonReq } from 'src/people/infrastructure/http-server/models/update-person.req'

export class UpdateEmployeeReq
  extends PartialType(OmitType(CreateEmployeeReq, ['person']))
  implements IUpdateEmployeeDto
{
  @ValidateNested()
  @Type(() => UpdatePersonReq)
  person?: UpdatePersonReq
}
