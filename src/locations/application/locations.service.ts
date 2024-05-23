import { Inject, Injectable } from '@nestjs/common'
import { ILocationsServicePort } from '../domain/ports/in/locations.service.port'
import { ILocationsRepositoryPort } from '../domain/ports/out/locations.repository.port'
import { LocationModel } from '../domain/models/location'

@Injectable()
export class LocationsService implements ILocationsServicePort {
  constructor(
    @Inject('ILocationsRepositoryPort')
    private readonly repository: ILocationsRepositoryPort,
  ) {}

  public async getLocations(): Promise<LocationModel[]> {
    return this.repository.getLocations()
  }

  public async createLocation(location: LocationModel): Promise<LocationModel> {
    return this.repository.createLocation(location)
  }

  public async getLocationById(locationId: number): Promise<LocationModel> {
    return this.repository.getLocationById(locationId)
  }

  public async updateLocation(
    id: number,
    location: LocationModel,
  ): Promise<LocationModel> {
    return this.repository.updateLocation(id, location)
  }

  public async deleteLocation(locationId: number): Promise<boolean> {
    return this.repository.deleteLocation(locationId)
  }
}
