import { Controller, Get, Inject } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IMostSoldService } from 'src/services/domain/dtos/most-sold-service.res'
import { IServicesServicePort } from 'src/services/domain/ports/in/services.service.port'
import { SERVICES_SERVICE_PORT } from 'src/services/shared/services.consts'
import { MostSoldService } from '../models/most-sold-service.res'

@Controller('services/reports')
@ApiTags('Services Reports')
export class ServicesReportsController {
  constructor(
    @Inject(SERVICES_SERVICE_PORT)
    private readonly servicesService: IServicesServicePort,
  ) {}

  @Get('most-sold')
  @ApiOperation({ summary: 'Get top 5 most sold services' })
  @ApiResponse({ status: 200, isArray: true, type: MostSoldService })
  async getMostSoldServices(): Promise<IMostSoldService[]> {
    return this.servicesService.getMostSoldServices()
  }
}
