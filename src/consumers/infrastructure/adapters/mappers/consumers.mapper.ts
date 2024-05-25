import { Consumer } from '@prisma/client'
import {
  ConsumerModel,
  ConsumerTypeModel,
} from 'src/consumers/domain/models/consumer'
import { CreateConsumerDto } from '../in/dtos/create-consumer.dto'
import { UpdateConsumerDto } from '../in/dtos/update-consumer.dto'

export class ConsumersMapper {
  public static toModel(consumer: Consumer): ConsumerModel {
    return new ConsumerModel(
      consumer.id,
      consumer.type as ConsumerTypeModel,
      consumer.isCustomer,
      consumer.personId,
    )
  }

  public static toModels(consumers: Consumer[]): ConsumerModel[] {
    return consumers.map((consumer) => this.toModel(consumer))
  }

  public static dtoToModel(
    dto: CreateConsumerDto | UpdateConsumerDto,
  ): ConsumerModel {
    return new ConsumerModel(undefined, dto.type, dto.isCustomer, dto.personId)
  }
}
