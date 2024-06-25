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
import { LocationsService } from 'src/locations/application/locations.service'
import { CreateLocationReq } from '../models/create-location.req'
import { UpdateLocationReq } from '../models/update-location.req'
import { LOCATIONS_SERVICE_PORT } from 'src/locations/shared/locations.consts'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'

@Controller('locations')
@Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
export class LocationsController {
  constructor(
    @Inject(LOCATIONS_SERVICE_PORT)
    private readonly locationsService: LocationsService,
  ) {}

  @Get()
  @Auth()
  async getLocations() {
    return await this.locationsService.getLocations()
  }

  @Get(':id')
  async getLocationById(@Param('id', ParseIntPipe) id: number) {
    return await this.locationsService.getLocationById(id)
  }

  @Post()
  async createLocation(@Body() location: CreateLocationReq) {
    return await this.locationsService.createLocation(location)
  }

  @Patch(':id')
  async updateLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() location: UpdateLocationReq,
  ) {
    return await this.locationsService.updateLocation(id, location)
  }

  @Patch(':id/toggle-active')
  async toggleLocationActive(@Param('id', ParseIntPipe) id: number) {
    return await this.locationsService.toggleLocationActive(id)
  }
}
