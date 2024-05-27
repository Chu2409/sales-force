import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator'
import { ICreateConsumerDto } from 'src/consumers/domain/dtos/create-consumer.dto'
import { ConsumerType } from 'src/consumers/domain/models/consumer.model'
import { CreatePersonReq } from 'src/people/infrastructure/http-server/models/create-person.req'

export class CreateConsumerReq implements ICreateConsumerDto {
  @IsEnum(ConsumerType)
  type: ConsumerType

  @IsBoolean()
  @IsOptional()
  isCustomer?: boolean

  @ValidateNested()
  @Type(() => CreatePersonReq)
  @IsDefined()
  person: CreatePersonReq
}
