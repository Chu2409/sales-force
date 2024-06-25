import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator'
import { ICreateConsumerDto } from 'src/consumers/domain/dtos/create-consumer.dto'
import { ConsumerType } from 'src/consumers/domain/models/consumer.interface'
import { CreatePersonReq } from 'src/people/infrastructure/http-server/models/create-person.req'

export class CreateConsumerReq implements ICreateConsumerDto {
  @IsEnum(ConsumerType)
  @ApiProperty({ enum: ConsumerType })
  type: ConsumerType

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  isCustomer?: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  isActive?: boolean

  @ValidateNested()
  @Type(() => CreatePersonReq)
  @IsDefined()
  @ApiProperty()
  person: CreatePersonReq
}
