import { IQuota } from '../models/quota.interface'

export interface ICreateQuotaDto
  extends Omit<IQuota, 'id' | 'isActive' | 'isAchieved' | 'employee'> {
  employeeId: number
  isAchieved?: boolean
  isActive?: boolean
}
