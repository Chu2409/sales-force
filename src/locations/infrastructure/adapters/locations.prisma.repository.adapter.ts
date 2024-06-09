import { Inject, Injectable } from '@nestjs/common'

import { ILocationsRepositoryPort } from 'src/locations/domain/ports/out/locations.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { PrismaService } from 'src/prisma/prisma.service'
import { ICreateLocationDto } from 'src/locations/domain/dtos/create-location.dto'
import { IUpdateLocationDto } from 'src/locations/domain/dtos/update-location.dto'
import { ILocationRes } from 'src/locations/domain/dtos/location.res'

@Injectable()
export class LocationsPrismaRepositoryAdapter
  implements ILocationsRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getLocations(): Promise<ILocationRes[]> {
    return await this.prismaService.location.findMany({
      orderBy: { name: 'asc' },
    })
  }

  async getLocationById(id: number): Promise<ILocationRes> {
    return await this.prismaService.location.findUnique({
      where: { id },
    })
  }

  async getLocationByName(name: string): Promise<ILocationRes> {
    return await this.prismaService.location.findFirst({
      where: { name },
    })
  }

  async createLocation(location: ICreateLocationDto): Promise<ILocationRes> {
    return await this.prismaService.location.create({
      data: location,
    })
  }

  async updateLocation(
    id: number,
    location: IUpdateLocationDto,
  ): Promise<ILocationRes> {
    return await this.prismaService.location.update({
      where: { id },
      data: location,
    })
  }

  async setLocationActive(id: number, state: boolean): Promise<boolean> {
    const location = await this.prismaService.location.update({
      where: { id },
      data: { isActive: state },
    })
    return !!location
  }
}
