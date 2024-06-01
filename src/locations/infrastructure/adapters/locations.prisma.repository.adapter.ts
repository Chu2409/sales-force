import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { ILocationsRepositoryPort } from 'src/locations/domain/ports/out/locations.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { PrismaService } from 'src/prisma/prisma.service'
import { ICreateLocationDto } from 'src/locations/domain/dtos/create-location.dto'
import { IUpdateLocationDto } from 'src/locations/domain/dtos/update-location.dto'
import { ILocationWithParentRes } from 'src/locations/domain/dtos/location-with-parent.res'
import { ILocationRes } from 'src/locations/domain/dtos/location.res'
import { LocationsMapper } from './locations.mapper'

@Injectable()
export class LocationsPrismaRepositoryAdapter
  implements ILocationsRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getLocations(): Promise<ILocationRes[]> {
    const locations = await this.prismaService.location.findMany()

    return locations.map((location) => LocationsMapper.toRes(location))
  }

  async getLocationsWithParent(): Promise<ILocationWithParentRes[]> {
    const locations = await this.prismaService.location.findMany({
      include: { parent: true },
    })

    return locations.map((location) =>
      LocationsMapper.toResWithParent(location),
    )
  }

  async getLocationById(id: number): Promise<ILocationWithParentRes> {
    const location = await this.prismaService.location.findUnique({
      where: { id },
      include: { parent: true },
    })

    if (!location) throw new NotFoundException('Location not found')

    return LocationsMapper.toResWithParent(location)
  }

  async createLocation(
    location: ICreateLocationDto,
  ): Promise<ILocationWithParentRes> {
    const createdLocation = await this.prismaService.location.create({
      data: location,
      include: { parent: true },
    })

    return LocationsMapper.toResWithParent(createdLocation)
  }

  async updateLocation(
    id: number,
    location: IUpdateLocationDto,
  ): Promise<ILocationWithParentRes> {
    await this.getLocationById(id)

    const updatedLocation = await this.prismaService.location.update({
      where: { id },
      data: location,
      include: { parent: true },
    })

    return LocationsMapper.toResWithParent(updatedLocation)
  }

  async deleteLocation(id: number): Promise<boolean> {
    await this.getLocationById(id)

    const location = await this.prismaService.location.delete({
      where: { id },
    })
    return !!location
  }
}
