import { IEmployee } from 'src/employees/domain/models/employee.interface'

export interface IQuota {
  id: number
  startDate: Date
  endDate: Date
  goal: number
  commission: number
  isAchieved: boolean
  isActive: boolean
  employee: IEmployee
}
