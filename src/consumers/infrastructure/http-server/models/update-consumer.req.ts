import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateConsumerReq } from './create-consumer.req'
import { UpdatePersonReq } from 'src/people/infrastructure/http-server/models/update-person.req'
import { ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { IUpdateConsumerDto } from 'src/consumers/domain/dtos/update-consumer.dto'

export class UpdateConsumerReq
  extends PartialType(OmitType(CreateConsumerReq, ['person']))
  implements IUpdateConsumerDto
{
  @ValidateNested()
  @Type(() => UpdatePersonReq)
  person?: UpdatePersonReq
}
