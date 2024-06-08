import { ICreateLocationDto } from '../../dtos/create-location.dto'
import { ILocationWithParentRes } from '../../dtos/location-with-parent.res'
import { ILocationRes } from '../../dtos/location.res'
import { IUpdateLocationDto } from '../../dtos/update-location.dto'

export interface ILocationsRepositoryPort {
  getLocationsWithParent(): Promise<ILocationWithParentRes[]>
  getLocations(): Promise<ILocationRes[]>
  getLocationById(id: number): Promise<ILocationWithParentRes>
  getLocationByName(name: string): Promise<ILocationRes>
  createLocation(location: ICreateLocationDto): Promise<ILocationWithParentRes>
  updateLocation(
    id: number,
    location: IUpdateLocationDto,
  ): Promise<ILocationWithParentRes>
  setLocationActive(id: number, state: boolean): Promise<boolean>
}
