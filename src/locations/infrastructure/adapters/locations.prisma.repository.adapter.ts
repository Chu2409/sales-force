import { Inject, Injectable } from '@nestjs/common'

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
    const locations = await this.prismaService.location.findMany({
      include: { parent: true },
      orderBy: { name: 'asc' },
    })

    return locations.map((location) =>
      LocationsMapper.toResWithParent(location),
    )
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

    return location ? LocationsMapper.toResWithParent(location) : null
  }

  async getLocationByName(name: string): Promise<ILocationRes> {
    const location = await this.prismaService.location.findFirst({
      where: { name },
    })

    return location ? LocationsMapper.toRes(location) : null
  }

  async createLocation(
    location: ICreateLocationDto,
  ): Promise<ILocationWithParentRes> {
    const createdLocation = await this.prismaService.location.create({
      data: location,
      include: { parent: true },
    })

    return createdLocation
      ? LocationsMapper.toResWithParent(createdLocation)
      : null
  }

  async updateLocation(
    id: number,
    location: IUpdateLocationDto,
  ): Promise<ILocationWithParentRes> {
    const updatedLocation = await this.prismaService.location.update({
      where: { id },
      data: location,
      include: { parent: true },
    })

    return updatedLocation
      ? LocationsMapper.toResWithParent(updatedLocation)
      : null
  }

  async setLocationActive(id: number, state: boolean): Promise<boolean> {
    const location = await this.prismaService.location.update({
      where: { id },
      data: { isActive: state },
    })
    return !!location
  }
}
