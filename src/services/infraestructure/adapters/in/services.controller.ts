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
import { CreateServiceDto } from './dtos/create-service.dto'
import { ServicesMapper } from '../mappers/services.mapper'
import { UpdateServiceDto } from './dtos/update-service.dto'

@Controller('services')
export class ServicesController {
  constructor(
    @Inject('IServicesServicePort')
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
  async CreateService(@Body() service: CreateServiceDto) {
    return await this.servicesService.createService(
      ServicesMapper.dtoToModel(service),
    )
  }

  @Patch(':id')
  async updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() service: UpdateServiceDto,
  ) {
    return await this.servicesService.updateService(
      id,
      ServicesMapper.dtoToModel(service),
    )
  }

  @Delete(':id')
  async deleteService(@Param('id', ParseIntPipe) id: number) {
    return await this.servicesService.deleteService(id)
  }
}
