import { Inject, Injectable } from '@nestjs/common'
import { ILocationsServicePort } from '../domain/ports/in/locations.service.port'
import { ILocationsRepositoryPort } from '../domain/ports/out/locations.repository.port'
import { LocationModel } from '../domain/models/location'
import { ICreateLocationDto } from '../domain/dtos/create-location.dto'
import { IUpdateLocationDto } from '../domain/dtos/update-location.dto'
import { LOCATIONS_REPOSITORY_PORT } from '../shared/locations-providers.consts'

@Injectable()
export class LocationsService implements ILocationsServicePort {
  constructor(
    @Inject(LOCATIONS_REPOSITORY_PORT)
    private readonly repository: ILocationsRepositoryPort,
  ) {}

  public async getLocations(): Promise<LocationModel[]> {
    return this.repository.getLocations()
  }

  public async createLocation(
    location: ICreateLocationDto,
  ): Promise<LocationModel> {
    return this.repository.createLocation(
      LocationModel.create({
        name: location.name,
        type: location.type,
        parentId: location.parentId,
      }),
    )
  }

  public async getLocationById(locationId: number): Promise<LocationModel> {
    return this.repository.getLocationById(locationId)
  }

  public async updateLocation(
    id: number,
    location: IUpdateLocationDto,
  ): Promise<LocationModel> {
    return this.repository.updateLocation(
      id,
      LocationModel.create({
        name: location.name,
        type: location.type,
        parentId: location.parentId,
      }),
    )
  }

  public async deleteLocation(locationId: number): Promise<boolean> {
    return this.repository.deleteLocation(locationId)
  }
}
