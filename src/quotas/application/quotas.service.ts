import { Inject, Injectable } from '@nestjs/common'
import { IQuotasServicePort } from '../domain/ports/in/quotas.service.port'
import { IQuotasRepositoryPort } from '../domain/ports/out/quotas.repository.port'
import { ICreateQuotaDto } from '../domain/dtos/create-quota.dto'
import { IUpdateQuotaDto } from '../domain/dtos/update-quota.dto'
import { IQuotaWithEmployeeRes } from '../domain/dtos/quota-with-employee.res'
import { QUOTAS_REPOSITORY_PORT } from '../shared/quotas.consts'
import { IQuotaRes } from '../domain/dtos/quota.res'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'
import { EMPLOYEES_SERVICE_PORT } from 'src/employees/shared/employees.consts'
import { EmployeesService } from 'src/employees/application/employees.service'

@Injectable()
export class QuotasService implements IQuotasServicePort {
  constructor(
    @Inject(QUOTAS_REPOSITORY_PORT)
    private readonly repository: IQuotasRepositoryPort,
    @Inject(EMPLOYEES_SERVICE_PORT)
    private readonly employeesService: EmployeesService,
  ) {}

  async createQuota(quota: ICreateQuotaDto): Promise<IQuotaWithEmployeeRes> {
    await this.employeesService.getEmployeeById(quota.employeeId)

    const createdQuota = await this.repository.createQuota(quota)
    if (!createdQuota)
      throw new AppError('Quota not created', Errors.INTERNAL_SERVER_ERROR)

    return createdQuota
  }

  async updateQuota(
    id: number,
    quota: IUpdateQuotaDto,
  ): Promise<IQuotaWithEmployeeRes> {
    await this.getQuotaById(id)

    if (quota.employeeId)
      await this.employeesService.getEmployeeById(quota.employeeId)

    const updatedQuota = await this.repository.updateQuota(id, quota)
    if (!updatedQuota)
      throw new AppError('Quota not updated', Errors.INTERNAL_SERVER_ERROR)

    return updatedQuota
  }

  async toggleQuotaActive(id: number): Promise<boolean> {
    const quota = await this.getQuotaById(id)

    return await this.repository.setQuotaActive(id, !quota.isActive)
  }

  async getQuotas(): Promise<IQuotaWithEmployeeRes[]> {
    return await this.repository.getQuotas()
  }

  async getQuotaById(id: number): Promise<IQuotaWithEmployeeRes> {
    const quota = await this.repository.getQuotaById(id)
    if (!quota) throw new AppError('Quota not found', Errors.NOT_FOUND)

    return quota
  }

  async getQuotasByEmployeeId(employeeId: number): Promise<IQuotaRes[]> {
    await this.employeesService.getEmployeeById(employeeId)

    return await this.repository.getQuotasByEmployeeId(employeeId)
  }
}
