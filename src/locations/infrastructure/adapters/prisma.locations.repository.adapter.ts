import { Inject, Injectable } from '@nestjs/common'

import { ILocationsRepositoryPort } from 'src/locations/domain/ports/out/locations.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { PrismaService } from 'src/prisma/prisma.service'
import { ICreateLocationDto } from 'src/locations/domain/dtos/create-location.dto'
import { IUpdateLocationDto } from 'src/locations/domain/dtos/update-location.dto'
import { LocationType } from 'src/locations/domain/models/location.model'
import { Location } from 'src/locations/domain/location'
import { ILocationWithParentRes } from 'src/locations/domain/dtos/location-with-parent.res'
import { ILocationRes } from 'src/locations/domain/dtos/location.res'

@Injectable()
export class PrismaLocationsRepositoryAdapter
  implements ILocationsRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getLocations(): Promise<ILocationRes[]> {
    const locations = await this.prismaService.location.findMany()

    return locations.map((location) => ({
      id: location.id,
      name: location.name,
      type: location.type as LocationType,
    }))
  }

  async getLocationsWithParent(): Promise<ILocationWithParentRes[]> {
    const locations = await this.prismaService.location.findMany({
      include: { parent: true },
    })

    console.log(locations)

    return locations.map((location) => ({
      ...location,
      type: location.type as LocationType,
      parent: location.parent
        ? ({
            id: location.parent.id,
            name: location.parent.name,
            type: location.parent.type as LocationType,
          } as Location)
        : null,
    }))
  }

  async getLocationById(id: number): Promise<ILocationWithParentRes> {
    const location = await this.prismaService.location.findUnique({
      where: { id },
      include: { parent: true },
    })

    return {
      ...location,
      type: location.type as LocationType,
      parent: location.parent
        ? ({
            id: location.parent.id,
            name: location.parent.name,
            type: location.parent.type as LocationType,
          } as Location)
        : null,
    }
  }

  async createLocation(
    location: ICreateLocationDto,
  ): Promise<ILocationWithParentRes> {
    const locationCreated = await this.prismaService.location.create({
      data: {
        name: location.name,
        type: location.type,
        parentId: location.parentId,
      },
      include: { parent: true },
    })

    return {
      ...locationCreated,
      type: locationCreated.type as LocationType,
      parent: locationCreated.parent
        ? ({
            id: locationCreated.parent.id,
            name: locationCreated.parent.name,
            type: locationCreated.parent.type as LocationType,
          } as Location)
        : null,
    }
  }

  async updateLocation(
    id: number,
    location: IUpdateLocationDto,
  ): Promise<ILocationWithParentRes> {
    const locationUpdated = await this.prismaService.location.update({
      where: { id },
      data: {
        name: location.name,
        type: location.type,
        parentId: location.parentId,
      },
      include: { parent: true },
    })

    return {
      ...locationUpdated,
      type: locationUpdated.type as LocationType,
      parent: locationUpdated.parent
        ? ({
            id: locationUpdated.parent.id,
            name: locationUpdated.parent.name,
            type: locationUpdated.parent.type as LocationType,
          } as Location)
        : null,
    }
  }

  async deleteLocation(id: number): Promise<boolean> {
    const location = await this.prismaService.location.delete({
      where: { id },
    })
    return !!location
  }
}
