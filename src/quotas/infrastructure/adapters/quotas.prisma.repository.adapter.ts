import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IQuotasRepositoryPort } from 'src/quotas/domain/ports/out/quotas.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { ICreateQuotaDto } from 'src/quotas/domain/dtos/create-quota.dto'
import { IUpdateQuotaDto } from 'src/quotas/domain/dtos/update-quota.dto'
import { QuotasMapper } from './quotas.mapper'
import { IQuotaRes } from 'src/quotas/domain/dtos/quota.res'
import { IQuotaWithEmployeeRes } from 'src/quotas/domain/dtos/quota-with-employee.res'

@Injectable()
export class QuotasPrismaRepositoryAdapter implements IQuotasRepositoryPort {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getQuotas(): Promise<IQuotaWithEmployeeRes[]> {
    const quotas = await this.prismaService.quota.findMany({
      orderBy: { startDate: 'desc' },
      include: {
        employee: {
          include: {
            person: {
              include: { location: true },
            },
          },
        },
      },
    })

    return quotas.map((quota) => QuotasMapper.toRes(quota))
  }

  async getQuotasByEmployeeId(employeeId: number): Promise<IQuotaRes[]> {
    return await this.prismaService.quota.findMany({
      where: { employeeId },
    })
  }

  async getQuotaById(id: number): Promise<IQuotaWithEmployeeRes> {
    const quota = await this.prismaService.quota.findUnique({
      where: { id },
      include: {
        employee: {
          include: {
            person: {
              include: { location: true },
            },
          },
        },
      },
    })

    return quota ? QuotasMapper.toRes(quota) : null
  }

  async createQuota(quota: ICreateQuotaDto): Promise<IQuotaWithEmployeeRes> {
    const createdQuota = await this.prismaService.quota.create({
      data: quota,
      include: {
        employee: {
          include: {
            person: {
              include: { location: true },
            },
          },
        },
      },
    })

    return createdQuota ? QuotasMapper.toRes(createdQuota) : null
  }

  async updateQuota(
    id: number,
    quota: IUpdateQuotaDto,
  ): Promise<IQuotaWithEmployeeRes> {
    const updatedQuota = await this.prismaService.quota.update({
      where: { id },
      data: quota,
      include: {
        employee: {
          include: {
            person: {
              include: { location: true },
            },
          },
        },
      },
    })

    return updatedQuota ? QuotasMapper.toRes(updatedQuota) : null
  }

  async setQuotaActive(id: number, state: boolean): Promise<boolean> {
    const quota = await this.prismaService.quota.update({
      where: { id },
      data: { isActive: state },
    })

    return !!quota
  }
}
