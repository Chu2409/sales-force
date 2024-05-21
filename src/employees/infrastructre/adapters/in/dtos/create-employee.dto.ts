import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator'
import { EmployeeRoleModel } from 'src/employees/domain/models/employee'

export class CreateEmployeeDto {
  @IsString()
  @MinLength(3)
  username: string

  @IsString()
  @MinLength(6)
  password: string

  @IsEnum(EmployeeRoleModel)
  role: EmployeeRoleModel

  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @IsNumber()
  @Min(1)
  personId: number
}
