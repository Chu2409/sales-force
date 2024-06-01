import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsEmail,
  IsNumberString,
  IsDateString,
  Length,
  MinLength,
  IsNumber,
  IsPositive,
} from 'class-validator'
import { ICreatePersonDto } from 'src/people/domain/dtos/create-person.dto'
import { PersonGender } from 'src/people/domain/models/person.interface'

export class CreatePersonReq implements ICreatePersonDto {
  @IsNumberString()
  @Length(10, 13)
  dni: string

  @IsString()
  @MinLength(3)
  name: string

  @IsString()
  @IsOptional()
  secondName?: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string

  @IsString()
  @IsOptional()
  secondLastName?: string

  @IsEnum(PersonGender)
  @IsOptional()
  gender?: PersonGender

  @IsEmail()
  @IsOptional()
  email?: string

  @IsNumberString()
  @IsOptional()
  phone?: string

  @IsDateString()
  @IsOptional()
  birthdate?: Date

  @IsNumber()
  @IsPositive()
  locationId: number
}
