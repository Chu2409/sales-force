import { Inject, Injectable } from '@nestjs/common'
import { LocationModel } from 'src/locations/domain/models/location'
import { ILocationsRepositoryPort } from 'src/locations/domain/ports/out/locations.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { LocationsMapper } from '../mappers/locations.mapper'

@Injectable()
export class PrismaLocationsRepositoryAdapter
  implements ILocationsRepositoryPort
{
  constructor(
    @Inject('PrismaService') private readonly prismaService: PrismaService,
  ) {}

  async getLocations(): Promise<LocationModel[]> {
    return LocationsMapper.toModels(
      await this.prismaService.location.findMany(),
    )
  }

  async getLocationById(id: number): Promise<LocationModel> {
    return LocationsMapper.toModel(
      await this.prismaService.location.findUnique({
        where: { id },
      }),
    )
  }

  async createLocation(location: LocationModel): Promise<LocationModel> {
    return LocationsMapper.toModel(
      await this.prismaService.location.create({
        data: {
          name: location.getName(),
          type: location.getType(),
          parentLocationId: location.getParentId(),
        },
      }),
    )
  }

  async updateLocation(
    id: number,
    location: LocationModel,
  ): Promise<LocationModel> {
    return LocationsMapper.toModel(
      await this.prismaService.location.update({
        where: { id },
        data: {
          name: location.getName(),
          type: location.getType(),
          parentLocationId: location.getParentId(),
        },
      }),
    )
  }

  async deleteLocation(id: number): Promise<boolean> {
    const location = await this.prismaService.location.delete({
      where: { id },
    })
    return !!location
  }
}
