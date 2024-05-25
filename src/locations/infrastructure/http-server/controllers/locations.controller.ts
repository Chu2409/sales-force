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
import { LocationsService } from 'src/locations/application/locations.service'
import { CreateLocationReq } from '../models/create-location.req'
import { UpdateLocationReq } from '../models/update-location.req'
import { LOCATIONS_SERVICE_PORT } from 'src/locations/shared/locations-providers.consts'

@Controller('locations')
export class LocationsController {
  constructor(
    @Inject(LOCATIONS_SERVICE_PORT)
    private readonly locationsService: LocationsService,
  ) {}

  @Get()
  async getLocations() {
    return await this.locationsService.getLocations()
  }

  @Get(':id')
  async getLocationById(@Param('id', ParseIntPipe) id: number) {
    return await this.locationsService.getLocationById(id)
  }

  @Post()
  async createLocation(@Body() location: CreateLocationReq) {
    return await this.locationsService.createLocation({
      name: location.name,
      type: location.type,
      parentId: location.parentId,
    })
  }

  @Patch(':id')
  async updateLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() location: UpdateLocationReq,
  ) {
    return await this.locationsService.updateLocation(id, {
      name: location.name,
      type: location.type,
      parentId: location.parentId,
    })
  }

  @Delete(':id')
  async deleteLocation(@Param('id', ParseIntPipe) id: number) {
    return await this.locationsService.deleteLocation(id)
  }
}