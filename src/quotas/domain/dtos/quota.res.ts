import { IQuota } from '../models/quota.interface'

export interface IQuotaRes extends Omit<IQuota, 'employee'> {}
