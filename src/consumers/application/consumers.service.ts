import { Inject, Injectable } from '@nestjs/common'
import { IConsumersServicePort } from '../domain/ports/in/consumers.service.port'
import { IConsumersRepositoryPort } from '../domain/ports/out/consumers.repository.port'
import { CONSUMERS_REPOSITORY_PORT } from '../shared/consumers.consts'
import { IConsumerRes } from '../domain/dtos/consumer.res'
import { ICreateConsumerDto } from '../domain/dtos/create-consumer.dto'
import { IUpdateConsumerDto } from '../domain/dtos/update-consumer.dto'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'
import { LOCATIONS_SERVICE_PORT } from 'src/locations/shared/locations.consts'
import { LocationsService } from 'src/locations/application/locations.service'

@Injectable()
export class ConsumersService implements IConsumersServicePort {
  constructor(
    @Inject(CONSUMERS_REPOSITORY_PORT)
    private readonly repository: IConsumersRepositoryPort,
    @Inject(LOCATIONS_SERVICE_PORT)
    private readonly locationsService: LocationsService,
  ) {}

  async getConsumers(): Promise<IConsumerRes[]> {
    return await this.repository.getConsumers()
  }

  async createConsumer(consumer: ICreateConsumerDto): Promise<IConsumerRes> {
    await this.locationsService.getLocationById(consumer.person.locationId)

    const createdConsumer = await this.repository.createConsumer(consumer)
    if (!createdConsumer)
      throw new AppError('Consumer not created', Errors.INTERNAL_SERVER_ERROR)

    return createdConsumer
  }

  async getConsumerById(consumerId: number): Promise<IConsumerRes> {
    const consumer = await this.repository.getConsumerById(consumerId)
    if (!consumer) throw new AppError('Consumer not found', Errors.NOT_FOUND)

    return consumer
  }

  async updateConsumer(
    id: number,
    consumer: IUpdateConsumerDto,
  ): Promise<IConsumerRes> {
    await this.getConsumerById(id)

    if (consumer.person?.locationId)
      await this.locationsService.getLocationById(consumer.person.locationId)

    const updatedConsumer = await this.repository.updateConsumer(id, consumer)
    if (!updatedConsumer)
      throw new AppError('Consumer not updated', Errors.INTERNAL_SERVER_ERROR)

    return updatedConsumer
  }

  async toggleConsumerActive(consumerId: number): Promise<boolean> {
    const consumer = await this.getConsumerById(consumerId)

    return await this.repository.setConsumerActive(
      consumerId,
      !consumer.isActive,
    )
  }
}
