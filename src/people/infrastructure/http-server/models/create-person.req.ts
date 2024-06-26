import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsEmail,
  IsNumberString,
  Length,
  MinLength,
  IsNumber,
  IsPositive,
  IsDate,
} from 'class-validator'
import { ICreatePersonDto } from 'src/people/domain/dtos/create-person.dto'
import { PersonGender } from 'src/people/domain/models/person.interface'

export class CreatePersonReq implements ICreatePersonDto {
  @IsNumberString()
  @Length(10, 13)
  @ApiProperty({ minLength: 10, maxLength: 13 })
  dni: string

  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 3 })
  name: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  secondName?: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ minLength: 2 })
  lastName: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  secondLastName?: string

  @IsEnum(PersonGender)
  @IsOptional()
  @ApiProperty({ enum: PersonGender, required: false })
  gender?: PersonGender

  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  phone?: string

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: false })
  birthdate?: Date

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  locationId: number
}
