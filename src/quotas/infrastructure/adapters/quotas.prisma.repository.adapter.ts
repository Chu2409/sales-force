import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IQuotasRepositoryPort } from 'src/quotas/domain/ports/out/quotas.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { ICreateQuotaDto } from 'src/quotas/domain/dtos/create-quota.dto'
import { IUpdateQuotaDto } from 'src/quotas/domain/dtos/update-quota.dto'
import { QuotasMapper } from './quotas.mapper'
import { EMPLOYEES_SERVICE_PORT } from 'src/employees/shared/employees.consts'
import { EmployeesService } from 'src/employees/application/employees.service'
import { IQuotaRes } from 'src/quotas/domain/dtos/quota.res'
import { IQuotaWithEmployeeRes } from 'src/quotas/domain/dtos/quota-with-employee.res'

@Injectable()
export class QuotasPrismaRepositoryAdapter implements IQuotasRepositoryPort {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
    @Inject(EMPLOYEES_SERVICE_PORT)
    private readonly employeesService: EmployeesService,
  ) {}

  async getQuotas(): Promise<IQuotaWithEmployeeRes[]> {
    const quotas = await this.prismaService.quota.findMany({
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
    await this.employeesService.getEmployeeById(employeeId)

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

    if (!quota) throw new NotFoundException('Quota not found')

    return QuotasMapper.toRes(quota)
  }

  async createQuota(quota: ICreateQuotaDto): Promise<IQuotaWithEmployeeRes> {
    await this.employeesService.getEmployeeById(quota.employeeId)

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

    return QuotasMapper.toRes(createdQuota)
  }

  async updateQuota(
    id: number,
    quota: IUpdateQuotaDto,
  ): Promise<IQuotaWithEmployeeRes> {
    await this.getQuotaById(id)

    if (quota.employeeId) {
      await this.employeesService.getEmployeeById(quota.employeeId)
    }

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

    return QuotasMapper.toRes(updatedQuota)
  }

  async deleteQuota(id: number): Promise<boolean> {
    await this.getQuotaById(id)

    const quota = await this.prismaService.quota.update({
      where: { id },
      data: { isActive: false },
    })

    return !!quota
  }
}
