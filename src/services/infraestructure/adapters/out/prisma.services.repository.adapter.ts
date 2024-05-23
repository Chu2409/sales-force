import { Inject } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ServiceModel } from 'src/services/domain/models/service'
import { IServicesRepositoryPort } from 'src/services/domain/ports/out/services.repository'
import { ServicesMapper } from '../mappers/services.mapper'

export class PrismaServicesRepositoryAdapter
  implements IServicesRepositoryPort
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService,
  ) {}

  async getServices(): Promise<ServiceModel[]> {
    return ServicesMapper.toModels(await this.prismaService.service.findMany())
  }

  async getServiceById(id: number): Promise<ServiceModel> {
    return ServicesMapper.toModel(
      await this.prismaService.service.findUnique({
        where: { id },
      }),
    )
  }

  async createService(service: ServiceModel): Promise<ServiceModel> {
    return ServicesMapper.toModel(
      await this.prismaService.service.create({
        data: {
          name: service.getName(),
          description: service.getDescription(),
          pricePerHour: service.getPricePerHour(),
          isAvailable: service.getIsAvaliable(),
        },
      }),
    )
  }

  async updateService(
    id: number,
    service: ServiceModel,
  ): Promise<ServiceModel> {
    return ServicesMapper.toModel(
      await this.prismaService.service.update({
        where: { id },
        data: {
          name: service.getName(),
          description: service.getDescription(),
          pricePerHour: service.getPricePerHour(),
          isAvailable: service.getIsAvaliable(),
        },
      }),
    )
  }

  async deleteService(id: number): Promise<boolean> {
    const service = await this.prismaService.service.delete({
      where: { id },
    })

    return !!service
  }
}
