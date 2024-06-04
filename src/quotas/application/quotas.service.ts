import { Inject, Injectable } from '@nestjs/common'
import { IQuotasServicePort } from '../domain/ports/in/quotas.service.port'
import { IQuotasRepositoryPort } from '../domain/ports/out/quotas.repository.port'
import { ICreateQuotaDto } from '../domain/dtos/create-quota.dto'
import { IUpdateQuotaDto } from '../domain/dtos/update-quota.dto'
import { IQuotaWithEmployeeRes } from '../domain/dtos/quota-with-employee.res'
import { QUOTAS_REPOSITORY_PORT } from '../shared/quotas-providers.consts'
import { IQuotaRes } from '../domain/dtos/quota.res'

@Injectable()
export class QuotasService implements IQuotasServicePort {
  constructor(
    @Inject(QUOTAS_REPOSITORY_PORT)
    private readonly repository: IQuotasRepositoryPort,
  ) {}

  async createQuota(quota: ICreateQuotaDto): Promise<IQuotaWithEmployeeRes> {
    return await this.repository.createQuota(quota)
  }

  async updateQuota(
    id: number,
    quota: IUpdateQuotaDto,
  ): Promise<IQuotaWithEmployeeRes> {
    return await this.repository.updateQuota(id, quota)
  }

  async deleteQuota(id: number): Promise<boolean> {
    return await this.repository.deleteQuota(id)
  }

  async getQuotas(): Promise<IQuotaWithEmployeeRes[]> {
    return await this.repository.getQuotas()
  }

  async getQuotaById(id: number): Promise<IQuotaWithEmployeeRes> {
    return await this.repository.getQuotaById(id)
  }

  async getQuotasByEmployeeId(employeeId: number): Promise<IQuotaRes[]> {
    return await this.repository.getQuotasByEmployeeId(employeeId)
  }
}
