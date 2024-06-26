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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ServiceRes } from '../models/service.res'

@Controller('services')
@Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
@ApiTags('Services')
export class ServicesController {
  constructor(
    @Inject(SERVICES_SERVICE_PORT)
    private readonly servicesService: ServicesService,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({ status: 200, isArray: true, type: ServiceRes })
  async getServices() {
    return await this.servicesService.getServices()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get service by id' })
  @ApiResponse({ status: 200, type: ServiceRes })
  async getServiceById(@Param('id', ParseIntPipe) id: number) {
    return await this.servicesService.getServiceById(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create service' })
  @ApiResponse({ status: 200, type: ServiceRes })
  async CreateService(@Body() service: CreateServiceReq) {
    return await this.servicesService.createService(service)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update service' })
  @ApiResponse({ status: 200, type: ServiceRes })
  async updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() service: UpdateServiceReq,
  ) {
    return await this.servicesService.updateService(id, service)
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle service active' })
  @ApiResponse({ status: 200, type: Boolean })
  async toggleServiceActive(@Param('id', ParseIntPipe) id: number) {
    return await this.servicesService.toggleServiceActive(id)
  }
}
