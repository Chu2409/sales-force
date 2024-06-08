import { IQuotaWithEmployeeRes } from '../../dtos/quota-with-employee.res'
import { ICreateQuotaDto } from '../../dtos/create-quota.dto'
import { IUpdateQuotaDto } from '../../dtos/update-quota.dto'
import { IQuotaRes } from '../../dtos/quota.res'

export interface IQuotasRepositoryPort {
  createQuota(quota: ICreateQuotaDto): Promise<IQuotaWithEmployeeRes>
  updateQuota(
    id: number,
    quota: IUpdateQuotaDto,
  ): Promise<IQuotaWithEmployeeRes>
  setQuotaActive(id: number, state: boolean): Promise<boolean>
  getQuotas(): Promise<IQuotaWithEmployeeRes[]>
  getQuotaById(id: number): Promise<IQuotaWithEmployeeRes>
  getQuotasByEmployeeId(employeeId: number): Promise<IQuotaRes[]>
}
