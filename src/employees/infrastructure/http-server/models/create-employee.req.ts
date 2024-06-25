import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty({ minLength: 3 })
  username: string

  @IsString()
  @ApiProperty()
  password: string

  @IsEnum(EmployeeRole)
  @ApiProperty({ enum: EmployeeRole })
  role: EmployeeRole

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  isActive?: boolean

  @ValidateNested()
  @Type(() => CreatePersonReq)
  @IsDefined()
  @ApiProperty()
  person: CreatePersonReq
}
