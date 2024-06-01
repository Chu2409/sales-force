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
import { ServicesService } from 'src/services/application/services.service'
import { SERVICES_SERVICE_PORT } from 'src/services/shared/products-providers.consts'
import { CreateServiceReq } from '../models/create-service.req'
import { UpdateServiceReq } from '../models/update-service.req'

@Controller('services')
export class ServicesController {
  constructor(
    @Inject(SERVICES_SERVICE_PORT)
    private readonly servicesService: ServicesService,
  ) {}

  @Get()
  async getServices() {
    return await this.servicesService.getServices()
  }

  @Get(':id')
  async getServiceById(@Param('id', ParseIntPipe) id: number) {
    return await this.servicesService.getServiceById(id)
  }

  @Post()
  async CreateService(@Body() service: CreateServiceReq) {
    return await this.servicesService.createService(service)
  }

  @Patch(':id')
  async updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() service: UpdateServiceReq,
  ) {
    return await this.servicesService.updateService(id, service)
  }

  @Delete(':id')
  async deleteService(@Param('id', ParseIntPipe) id: number) {
    return await this.servicesService.deleteService(id)
  }
}
