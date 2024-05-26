import { Inject } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IServicesRepositoryPort } from 'src/services/domain/ports/out/services.repository'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { IServiceRes } from 'src/services/domain/dtos/service.res'
import { IUpdateServiceDto } from 'src/services/domain/dtos/update-service.dto'
import { ICreateServiceDto } from 'src/services/domain/dtos/create-service.dto'

export class ServicesPrismaRepositoryAdapter
  implements IServicesRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,
  ) {}

  async getServices(): Promise<IServiceRes[]> {
    return await this.prismaService.service.findMany()
  }

  async getServiceById(id: number): Promise<IServiceRes> {
    return await this.prismaService.service.findUniqueOrThrow({
      where: { id },
    })
  }

  async createService(service: ICreateServiceDto): Promise<IServiceRes> {
    return await this.prismaService.service.create({
      data: {
        name: service.name,
        description: service.description,
        pricePerHour: service.pricePerHour,
        isAvailable: service.isAvailable,
      },
    })
  }

  async updateService(
    id: number,
    service: IUpdateServiceDto,
  ): Promise<IServiceRes> {
    return await this.prismaService.service.update({
      where: { id },
      data: {
        name: service.name,
        description: service.description,
        pricePerHour: service.pricePerHour,
        isAvailable: service.isAvailable,
      },
    })
  }

  async deleteService(id: number): Promise<boolean> {
    const service = await this.prismaService.service.delete({
      where: { id },
    })

    return !!service
  }
}
