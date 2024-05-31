import { ICreateLocationDto } from '../../dtos/create-location.dto'
import { IUpdateLocationDto } from '../../dtos/update-location.dto'
import { ILocationWithParentRes } from '../../dtos/location-with-parent.res'
import { ILocationRes } from '../../dtos/location.res'

export interface ILocationsServicePort {
  getLocationsWithParent(): Promise<ILocationWithParentRes[]>
  getLocations(): Promise<ILocationRes[]>
  getLocationById(id: number): Promise<ILocationWithParentRes>
  createLocation(location: ICreateLocationDto): Promise<ILocationWithParentRes>
  updateLocation(
    id: number,
    location: IUpdateLocationDto,
  ): Promise<ILocationWithParentRes>
  deleteLocation(id: number): Promise<boolean>
}
