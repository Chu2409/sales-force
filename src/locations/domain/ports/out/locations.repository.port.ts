import { ICreateLocationDto } from '../../dtos/create-location.dto'
import { ILocationRes } from '../../dtos/location.res'
import { IUpdateLocationDto } from '../../dtos/update-location.dto'

export interface ILocationsRepositoryPort {
  getLocations(): Promise<ILocationRes[]>
  getLocationById(id: number): Promise<ILocationRes>
  getLocationByName(name: string): Promise<ILocationRes>
  createLocation(location: ICreateLocationDto): Promise<ILocationRes>
  updateLocation(
    id: number,
    location: IUpdateLocationDto,
  ): Promise<ILocationRes>
  setLocationActive(id: number, state: boolean): Promise<boolean>
}
