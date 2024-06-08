import { Location } from '@prisma/client'
import { ILocationWithParentRes } from 'src/locations/domain/dtos/location-with-parent.res'
import { ILocationRes } from 'src/locations/domain/dtos/location.res'
import { LocationType } from 'src/locations/domain/models/location.interface'

interface PrismaLocationWithParent extends Location {
  parent: Location | null
}

export class LocationsMapper {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static toRes({ parentId, ...location }: Location): ILocationRes {
    return {
      ...location,
      type: location.type as LocationType,
    }
  }

  static toResWithParent({
    parent,
    ...location
  }: PrismaLocationWithParent): ILocationWithParentRes {
    return {
      ...this.toRes(location),
      parent: parent
        ? {
            id: parent.id,
            name: parent.name,
            type: parent.type as LocationType,
            isActive: parent.isActive,
          }
        : null,
    }
  }
}
