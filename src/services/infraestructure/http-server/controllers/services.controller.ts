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
import { ServicesService } from 'src/services/application/services.service'
import { SERVICES_SERVICE_PORT } from 'src/services/shared/services.consts'
import { CreateServiceReq } from '../models/create-service.req'
import { UpdateServiceReq } from '../models/update-service.req'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'

@Controller('services')
@Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
export class ServicesController {
  constructor(
    @Inject(SERVICES_SERVICE_PORT)
    private readonly servicesService: ServicesService,
  ) {}

  @Get()
  @Auth()
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

  @Patch(':id/toggle-active')
  async toggleServiceActive(@Param('id', ParseIntPipe) id: number) {
    return await this.servicesService.toggleServiceActive(id)
  }
}
