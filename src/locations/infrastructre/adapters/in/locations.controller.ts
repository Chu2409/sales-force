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
import { CreateLocationDto } from './dtos/create-location.dto'
import { UpdateLocationDto } from './dtos/update-location.dto'
import { LocationsMapper } from '../mappers/locations.mapper'

@Controller('locations')
export class LocationsController {
  constructor(
    @Inject('ILocationsServicePort')
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
  async createLocation(@Body() location: CreateLocationDto) {
    return await this.locationsService.createLocation(
      LocationsMapper.dtoToModel(location),
    )
  }

  @Patch(':id')
  async updateLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() location: UpdateLocationDto,
  ) {
    return await this.locationsService.updateLocation(
      id,
      LocationsMapper.dtoToModel(location),
    )
  }

  @Delete(':id')
  async deleteLocation(@Param('id', ParseIntPipe) id: number) {
    return await this.locationsService.deleteLocation(id)
  }
}
