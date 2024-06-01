import { Inject, Injectable } from '@nestjs/common'
import { ILocationsServicePort } from '../domain/ports/in/locations.service.port'
import { ILocationsRepositoryPort } from '../domain/ports/out/locations.repository.port'
import { ICreateLocationDto } from '../domain/dtos/create-location.dto'
import { IUpdateLocationDto } from '../domain/dtos/update-location.dto'
import { LOCATIONS_REPOSITORY_PORT } from '../shared/locations-providers.consts'
import { ILocationWithParentRes } from '../domain/dtos/location-with-parent.res'
import { ILocationRes } from '../domain/dtos/location.res'

@Injectable()
export class LocationsService implements ILocationsServicePort {
  constructor(
    @Inject(LOCATIONS_REPOSITORY_PORT)
    private readonly repository: ILocationsRepositoryPort,
  ) {}

  async getLocations(): Promise<ILocationRes[]> {
    return await this.repository.getLocations()
  }

  async getLocationsWithParent(): Promise<ILocationWithParentRes[]> {
    return await this.repository.getLocationsWithParent()
  }

  async createLocation(
    location: ICreateLocationDto,
  ): Promise<ILocationWithParentRes> {
    return await this.repository.createLocation(location)
  }

  async getLocationById(locationId: number): Promise<ILocationWithParentRes> {
    return await this.repository.getLocationById(locationId)
  }

  async updateLocation(
    id: number,
    location: IUpdateLocationDto,
  ): Promise<ILocationWithParentRes> {
    return await this.repository.updateLocation(id, location)
  }

  async deleteLocation(locationId: number): Promise<boolean> {
    return await this.repository.deleteLocation(locationId)
  }
}
