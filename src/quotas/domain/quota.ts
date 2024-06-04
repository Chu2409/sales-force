import { IEmployee } from 'src/employees/domain/models/employee.interface'
import { IQuota } from './models/quota.interface'

export class Quota implements IQuota {
  id: number
  startDate: Date
  endDate: Date
  goal: number
  commission: number
  isAchieved: boolean
  isActive: boolean
  employee: IEmployee

  private constructor() {}

  static builder() {
    return new QuotaBuilder(new Quota())
  }
}

class QuotaBuilder {
  constructor(private quota: IQuota) {}

  id(id: number) {
    this.quota.id = id
    return this
  }

  startDate(startDate: Date) {
    this.quota.startDate = startDate
    return this
  }

  endDate(endDate: Date) {
    this.quota.endDate = endDate
    return this
  }

  goal(goal: number) {
    this.quota.goal = goal
    return this
  }

  commission(commission: number) {
    this.quota.commission = commission
    return this
  }

  isAchieved(isAchieved: boolean) {
    this.quota.isAchieved = isAchieved
    return this
  }

  isActive(isActive: boolean) {
    this.quota.isActive = isActive
    return this
  }

  employee(employee: IEmployee) {
    this.quota.employee = employee
    return this
  }

  build() {
    return this.quota
  }
}
