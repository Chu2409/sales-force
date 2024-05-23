import { IsBoolean, IsEnum, IsNumber, IsOptional, Min } from 'class-validator'
import { ConsumerTypeModel } from 'src/consumers/domain/models/consumer'

export class CreateConsumerDto {
  @IsEnum(ConsumerTypeModel)
  type: ConsumerTypeModel

  @IsBoolean()
  @IsOptional()
  isCustomer?: boolean

  @IsNumber()
  @Min(1)
  personId: number
}
