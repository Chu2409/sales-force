import { Inject, Injectable } from '@nestjs/common'
import {
  LocationModel,
  LocationTypeModel,
} from 'src/locations/domain/models/location'
import { ILocationsRepositoryPort } from 'src/locations/domain/ports/out/locations.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class PrismaLocationsRepositoryAdapter
  implements ILocationsRepositoryPort
{
  constructor(
    @Inject('PrismaService') private readonly prismaService: PrismaService,
  ) {}

  async getLocations(): Promise<LocationModel[]> {
    const locations = await this.prismaService.location.findMany({
      include: { parent: true },
    })

    return locations.map((location) => ({
      ...location,
      type: location.type as LocationTypeModel,
      parent: location.parent
        ? LocationModel.createWithouParent({
            name: location.parent?.name,
            type: location.parent?.type as LocationTypeModel,
            parentId: location.parent?.id,
          })
        : null,
    }))
  }

  async getLocationById(id: number): Promise<LocationModel> {
    const location = await this.prismaService.location.findUnique({
      where: { id },
      include: { parent: true },
    })

    return {
      ...location,
      type: location.type as LocationTypeModel,
      parent: location.parent
        ? LocationModel.create({
            name: location.parent?.name,
            type: location.parent?.type as LocationTypeModel,
            parentId: location.parent?.id,
          })
        : null,
    }
  }

  async createLocation(location: LocationModel): Promise<LocationModel> {
    const locationCreated = await this.prismaService.location.create({
      data: {
        name: location.name,
        type: location.type,
        parentId: location.parent?.id,
      },
      include: { parent: true },
    })

    return {
      ...locationCreated,
      type: locationCreated.type as LocationTypeModel,
      parent: location.parent
        ? LocationModel.create({
            name: location.parent?.name,
            type: location.parent?.type as LocationTypeModel,
            parentId: location.parent?.id,
          })
        : null,
    }
  }

  async updateLocation(
    id: number,
    location: LocationModel,
  ): Promise<LocationModel> {
    const locationUpdated = await this.prismaService.location.update({
      where: { id },
      data: {
        name: location.name,
        type: location.type,
        parentId: location.parent?.id,
      },
      include: { parent: true },
    })

    return {
      ...locationUpdated,
      type: locationUpdated.type as LocationTypeModel,
      parent: location.parent
        ? LocationModel.create({
            name: location.parent?.name,
            type: location.parent?.type as LocationTypeModel,
            parentId: location.parent?.id,
          })
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
