import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ConsumersService } from 'src/consumers/application/consumers.service'
import { CreateConsumerDto } from './dtos/create-consumer.dto'
import { UpdateConsumerDto } from './dtos/update-consumer.dto'
import { ConsumersMapper } from '../mappers/consumers.mapper'

@Controller('consumers')
export class ConsumersController {
  constructor(
    @Inject('IConsumersServicePort')
    private readonly consumersService: ConsumersService,
  ) {}

  @Get()
  async getConsumers() {
    return await this.consumersService.getConsumers()
  }

  @Get(':id')
  async getConsumerById(@Param('id', ParseIntPipe) id: number) {
    return await this.consumersService.getConsumerById(id)
  }

  @Post()
  async createConsumer(@Body() consumer: CreateConsumerDto) {
    return await this.consumersService.createConsumer(
      ConsumersMapper.dtoToModel(consumer),
    )
  }

  @Patch(':id')
  async updateConsumer(
    @Param('id', ParseIntPipe) id: number,
    @Body() consumer: UpdateConsumerDto,
  ) {
    return await this.consumersService.updateConsumer(
      id,
      ConsumersMapper.dtoToModel(consumer),
    )
  }

  @Delete(':id')
  async deleteConsumer(@Param('id', ParseIntPipe) id: number) {
    return await this.consumersService.deleteConsumer(id)
  }
}
