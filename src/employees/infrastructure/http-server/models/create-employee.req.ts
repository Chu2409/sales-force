import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { ICreateEmployeeDto } from 'src/employees/domain/dtos/create-employee.dto'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { CreatePersonReq } from 'src/people/infrastructure/http-server/models/create-person.req'

export class CreateEmployeeReq implements ICreateEmployeeDto {
  @IsString()
  @MinLength(3)
  username: string

  @IsString()
  @MinLength(6)
  password: string

  @IsEnum(EmployeeRole)
  role: EmployeeRole

  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @ValidateNested()
  @Type(() => CreatePersonReq)
  @IsDefined()
  person: CreatePersonReq
}
