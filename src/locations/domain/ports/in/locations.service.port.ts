import { ICreateLocationDto } from '../../dtos/create-location.dto'
import { IUpdateLocationDto } from '../../dtos/update-location.dto'
import { LocationModel } from '../../models/location'

export interface ILocationsServicePort {
  getLocations(): Promise<LocationModel[]>
  getLocationById(id: number): Promise<LocationModel | null>
  createLocation(location: ICreateLocationDto): Promise<LocationModel>
  updateLocation(
    id: number,
    location: IUpdateLocationDto,
  ): Promise<LocationModel>
  deleteLocation(id: number): Promise<boolean>
}
