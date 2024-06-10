import { IConsumer } from 'src/consumers/domain/models/consumer.interface'
import { IEmployee } from 'src/employees/domain/models/employee.interface'

export interface IDelegation {
  id: number
  isActive: boolean
  consumer: IConsumer
  employee: IEmployee
}
