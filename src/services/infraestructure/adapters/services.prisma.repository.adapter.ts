import { Inject } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IServicesRepositoryPort } from 'src/services/domain/ports/out/services.repository'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { IServiceRes } from 'src/services/domain/dtos/service.res'
import { IUpdateServiceDto } from 'src/services/domain/dtos/update-service.dto'
import { ICreateServiceDto } from 'src/services/domain/dtos/create-service.dto'
import { IMostSoldService } from 'src/services/domain/dtos/most-sold-service.res'

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
    return await this.prismaService.service.findUnique({
      where: { id },
    })
  }

  async createService(service: ICreateServiceDto): Promise<IServiceRes> {
    return await this.prismaService.service.create({
      data: service,
    })
  }

  async updateService(
    id: number,
    service: IUpdateServiceDto,
  ): Promise<IServiceRes> {
    return await this.prismaService.service.update({
      where: { id },
      data: service,
    })
  }

  async setServiceActive(id: number, state: boolean): Promise<boolean> {
    const service = await this.prismaService.service.update({
      where: { id },
      data: { isActive: state },
    })
    return !!service
  }
  async getMostSoldServices(): Promise<IMostSoldService[]> {
    const mostSoldServices: any = await this.prismaService.$queryRaw`
      SELECT s.name, SUM(i.quantity) as quantity
      FROM services s
      JOIN items i ON s.id = i.service_id
      JOIN transactions t ON i.transaction_id = t.id
        WHERE t.status = 'PAID'
      GROUP BY s.id
      ORDER BY quantity DESC
      LIMIT 5
    `

    return mostSoldServices.map((service) => ({
      name: service.name,
      quantity: Number(service.quantity),
    }))
  }
}
