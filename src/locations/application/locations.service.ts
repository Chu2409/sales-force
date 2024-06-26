import { Inject, Injectable } from '@nestjs/common'
import { ILocationsServicePort } from '../domain/ports/in/locations.service.port'
import { ILocationsRepositoryPort } from '../domain/ports/out/locations.repository.port'
import { ICreateLocationDto } from '../domain/dtos/create-location.dto'
import { IUpdateLocationDto } from '../domain/dtos/update-location.dto'
import { LOCATIONS_REPOSITORY_PORT } from '../shared/locations.consts'
import { ILocationRes } from '../domain/dtos/location.res'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'

@Injectable()
export class LocationsService implements ILocationsServicePort {
  constructor(
    @Inject(LOCATIONS_REPOSITORY_PORT)
    private readonly repository: ILocationsRepositoryPort,
  ) {}

  async getLocations(): Promise<ILocationRes[]> {
    return await this.repository.getLocations()
  }

  async createLocation(location: ICreateLocationDto): Promise<ILocationRes> {
    const locationExists = await this.repository.getLocationByName(
      location.name,
    )
    if (locationExists)
      throw new AppError('Location already exists', Errors.CONFLICT)

    const createdLocation = await this.repository.createLocation(location)
    if (!createdLocation)
      throw new AppError('Location not created', Errors.INTERNAL_SERVER_ERROR)

    return createdLocation
  }

  async getLocationById(locationId: number): Promise<ILocationRes> {
    const location = await this.repository.getLocationById(locationId)
    if (!location) throw new AppError('Location not found', Errors.NOT_FOUND)

    return location
  }

  async updateLocation(
    id: number,
    location: IUpdateLocationDto,
  ): Promise<ILocationRes> {
    await this.getLocationById(id)

    const locationExists = await this.repository.getLocationByName(
      location.name,
    )
    if (locationExists && locationExists.id !== id)
      throw new AppError('Location already exists', Errors.CONFLICT)

    const updatedLocation = await this.repository.updateLocation(id, location)
    if (!updatedLocation)
      throw new AppError('Location not updated', Errors.INTERNAL_SERVER_ERROR)

    return updatedLocation
  }

  async toggleLocationActive(locationId: number): Promise<boolean> {
    const location = await this.getLocationById(locationId)

    return await this.repository.setLocationActive(
      locationId,
      !location.isActive,
    )
  }
}
