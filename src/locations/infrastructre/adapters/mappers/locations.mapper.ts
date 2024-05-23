import { Location } from '@prisma/client'
import {
  LocationModel,
  LocationTypeModel,
} from 'src/locations/domain/models/location'
import { CreateLocationDto } from '../in/dtos/create-location.dto'
import { UpdateLocationDto } from '../in/dtos/update-location.dto'

export class LocationsMapper {
  public static toModel(location: Location): LocationModel {
    return new LocationModel(
      location.id,
      location.name,
      location.type as LocationTypeModel,
      location.parentLocationId,
    )
  }

  public static toModels(locations: Location[]): LocationModel[] {
    return locations.map((location) => this.toModel(location))
  }

  public static dtoToModel(
    dto: CreateLocationDto | UpdateLocationDto,
  ): LocationModel {
    return new LocationModel(
      undefined,
      dto.name,
      dto.type as LocationTypeModel,
      dto.parentId,
    )
  }
}
