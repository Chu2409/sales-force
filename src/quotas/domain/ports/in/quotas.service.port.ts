import { ICreateQuotaDto } from '../../dtos/create-quota.dto'
import { IUpdateQuotaDto } from '../../dtos/update-quota.dto'
import { IQuotaWithEmployeeRes } from '../../dtos/quota-with-employee.res'
import { IQuotaRes } from '../../dtos/quota.res'

export interface IQuotasServicePort {
  createQuota(quota: ICreateQuotaDto): Promise<IQuotaWithEmployeeRes>
  updateQuota(
    id: number,
    quota: IUpdateQuotaDto,
  ): Promise<IQuotaWithEmployeeRes>
  toggleQuotaActive(id: number): Promise<boolean>
  getQuotas(): Promise<IQuotaWithEmployeeRes[]>
  getQuotaById(id: number): Promise<IQuotaWithEmployeeRes>
  getQuotasByEmployeeId(employeeId: number): Promise<IQuotaRes[]>
}
