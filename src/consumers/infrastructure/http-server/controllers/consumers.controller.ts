import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ConsumersService } from 'src/consumers/application/consumers.service'
import { CONSUMERS_SERVICE_PORT } from 'src/consumers/shared/consumers.consts'
import { CreateConsumerReq } from '../models/create-consumer.req'
import { UpdateConsumerReq } from '../models/update-consumer.req'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ConsumerRes } from '../models/consumer.res'

@Controller('consumers')
@ApiTags('Consumers')
export class ConsumersController {
  constructor(
    @Inject(CONSUMERS_SERVICE_PORT)
    private readonly consumersService: ConsumersService,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all consumers' })
  @ApiResponse({ status: 200, isArray: true, type: ConsumerRes })
  async getConsumers() {
    return await this.consumersService.getConsumers()
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Get consumer by id' })
  @ApiResponse({ status: 200, type: ConsumerRes })
  async getConsumerById(@Param('id', ParseIntPipe) id: number) {
    return await this.consumersService.getConsumerById(id)
  }

  @Get('location/:locationId')
  @Auth()
  @ApiOperation({ summary: 'Get consumers by location id' })
  @ApiResponse({ status: 200, isArray: true, type: ConsumerRes })
  async getConsumersByLocationId(
    @Param('locationId', ParseIntPipe) locationId: number,
  ) {
    return await this.consumersService.getConsumersByLocationId(locationId)
  }

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Create consumer' })
  @ApiResponse({ status: 201, type: ConsumerRes })
  async createConsumer(@Body() consumer: CreateConsumerReq) {
    return await this.consumersService.createConsumer(consumer)
  }

  @Patch(':id')
  @Auth()
  @ApiOperation({ summary: 'Update consumer' })
  @ApiResponse({ status: 200, type: ConsumerRes })
  async updateConsumer(
    @Param('id', ParseIntPipe) id: number,
    @Body() consumer: UpdateConsumerReq,
  ) {
    return await this.consumersService.updateConsumer(id, consumer)
  }

  @Patch(':id/toggle-active')
  @Auth()
  @ApiOperation({ summary: 'Toggle consumer active' })
  @ApiResponse({ status: 200, type: Boolean })
  async toggleConsumerActive(@Param('id', ParseIntPipe) id: number) {
    return await this.consumersService.toggleConsumerActive(id)
  }
}
