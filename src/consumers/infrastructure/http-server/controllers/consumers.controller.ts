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
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'

@Controller('consumers')
@Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
export class ConsumersController {
  constructor(
    @Inject(CONSUMERS_SERVICE_PORT)
    private readonly consumersService: ConsumersService,
  ) {}

  @Get()
  @Auth()
  async getConsumers() {
    return await this.consumersService.getConsumers()
  }

  @Get(':id')
  async getConsumerById(@Param('id', ParseIntPipe) id: number) {
    return await this.consumersService.getConsumerById(id)
  }

  @Get('location/:locationId')
  async getConsumersByLocationId(
    @Param('locationId', ParseIntPipe) locationId: number,
  ) {
    return await this.consumersService.getConsumersByLocationId(locationId)
  }

  @Post()
  async createConsumer(@Body() consumer: CreateConsumerReq) {
    return await this.consumersService.createConsumer(consumer)
  }

  @Patch(':id')
  async updateConsumer(
    @Param('id', ParseIntPipe) id: number,
    @Body() consumer: UpdateConsumerReq,
  ) {
    return await this.consumersService.updateConsumer(id, consumer)
  }

  @Patch(':id/toggle-active')
  async toggleConsumerActive(@Param('id', ParseIntPipe) id: number) {
    return await this.consumersService.toggleConsumerActive(id)
  }
}
