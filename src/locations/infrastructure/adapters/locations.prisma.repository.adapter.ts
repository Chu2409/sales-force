/* eslint-disable @typescript-eslint/no-unused-vars */
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
export class LocationsPrismaRepositoryAdapter
  implements ILocationsRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getLocations(): Promise<ILocationRes[]> {
    const locations = await this.prismaService.location.findMany()

    return locations.map(({ parentId, ...location }) => ({
      ...location,
      type: location.type as LocationType,
    }))
  }

  async getLocationsWithParent(): Promise<ILocationWithParentRes[]> {
    const locations = await this.prismaService.location.findMany({
      include: { parent: true },
    })

    return locations.map(({ parentId, ...location }) => ({
      ...location,
      type: location.type as LocationType,
      parent: location.parent
        ? {
            id: location.parent.id,
            name: location.parent.name,
            type: location.parent.type as LocationType,
          }
        : null,
    }))
  }

  async getLocationById(id: number): Promise<ILocationWithParentRes> {
    const { parentId, ...location } =
      await this.prismaService.location.findUniqueOrThrow({
        where: { id },
        include: { parent: true },
      })

    return {
      ...location,
      type: location.type as LocationType,
      parent: location.parent
        ? {
            id: location.parent.id,
            name: location.parent.name,
            type: location.parent.type as LocationType,
          }
        : null,
    }
  }

  async createLocation(
    locationToCreate: ICreateLocationDto,
  ): Promise<ILocationWithParentRes> {
    const { parentId, ...location } = await this.prismaService.location.create({
      data: {
        name: locationToCreate.name,
        type: locationToCreate.type,
        parentId: locationToCreate.parentId,
      },
      include: { parent: true },
    })

    return {
      ...location,
      type: location.type as LocationType,
      parent: location.parent
        ? {
            id: location.parent.id,
            name: location.parent.name,
            type: location.parent.type as LocationType,
          }
        : null,
    }
  }

  async updateLocation(
    id: number,
    locationToUpdate: IUpdateLocationDto,
  ): Promise<ILocationWithParentRes> {
    const { parentId, ...location } = await this.prismaService.location.update({
      where: { id },
      data: {
        name: locationToUpdate.name,
        type: locationToUpdate.type,
        parentId: locationToUpdate.parentId,
      },
      include: { parent: true },
    })

    return {
      ...location,
      type: location.type as LocationType,
      parent: location.parent
        ? {
            id: location.parent.id,
            name: location.parent.name,
            type: location.parent.type as LocationType,
          }
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
