/* eslint-disable @typescript-eslint/no-unused-vars */
import { Location } from '@prisma/client'
import { ILocationWithParentRes } from 'src/locations/domain/dtos/location-with-parent.res'
import { ILocationRes } from 'src/locations/domain/dtos/location.res'
import { LocationType } from 'src/locations/domain/models/location.interface'

interface ILocationWithParentPrisma extends Location {
  parent: Location | null
}

export class LocationsMapper {
  static toRes({ parentId, ...location }: Location): ILocationRes {
    return {
      ...location,
      type: location.type as LocationType,
    }
  }

  static toResWithParent({
    parentId,
    parent,
    ...location
  }: ILocationWithParentPrisma): ILocationWithParentRes {
    return {
      ...location,
      type: location.type as LocationType,
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
