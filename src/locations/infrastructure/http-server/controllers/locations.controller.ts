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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LocationRes } from '../models/location.res'

@Controller('locations')
@ApiTags('Locations')
export class LocationsController {
  constructor(
    @Inject(LOCATIONS_SERVICE_PORT)
    private readonly locationsService: LocationsService,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({ status: 200, isArray: true, type: LocationRes })
  async getLocations() {
    return await this.locationsService.getLocations()
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Get location by id' })
  @ApiResponse({ status: 200, type: LocationRes })
  async getLocationById(@Param('id', ParseIntPipe) id: number) {
    return await this.locationsService.getLocationById(id)
  }

  @Post()
  @Auth(EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Create location' })
  @ApiResponse({ status: 201, type: LocationRes })
  async createLocation(@Body() location: CreateLocationReq) {
    return await this.locationsService.createLocation(location)
  }

  @Patch(':id')
  @Auth(EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Update location' })
  @ApiResponse({ status: 200, type: LocationRes })
  async updateLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() location: UpdateLocationReq,
  ) {
    return await this.locationsService.updateLocation(id, location)
  }

  @Patch(':id/toggle-active')
  @Auth(EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Toggle location active' })
  @ApiResponse({ status: 200, type: Boolean })
  async toggleLocationActive(@Param('id', ParseIntPipe) id: number) {
    return await this.locationsService.toggleLocationActive(id)
  }
}
