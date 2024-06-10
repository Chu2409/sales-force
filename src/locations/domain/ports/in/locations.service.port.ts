import { ICreateLocationDto } from '../../dtos/create-location.dto'
import { IUpdateLocationDto } from '../../dtos/update-location.dto'
import { ILocationRes } from '../../dtos/location.res'

export interface ILocationsServicePort {
  getLocations(): Promise<ILocationRes[]>
  getLocationById(id: number): Promise<ILocationRes>
  createLocation(location: ICreateLocationDto): Promise<ILocationRes>
  updateLocation(
    id: number,
    location: IUpdateLocationDto,
  ): Promise<ILocationRes>
  toggleLocationActive(id: number): Promise<boolean>
}
