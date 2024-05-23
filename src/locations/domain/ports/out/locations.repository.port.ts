import { LocationModel } from '../../models/location'

export interface ILocationsRepositoryPort {
  getLocations(): Promise<LocationModel[]>
  getLocationById(id: number): Promise<LocationModel | null>
  createLocation(location: LocationModel): Promise<LocationModel>
  updateLocation(id: number, location: LocationModel): Promise<LocationModel>
  deleteLocation(id: number): Promise<boolean>
}
