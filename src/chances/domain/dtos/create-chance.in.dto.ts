import { ChanceStatus, IChance } from '../models/chance.interface'

export interface ICreateChanceInDto
  extends Omit<IChance, 'id' | 'delegation' | 'status'> {
  status?: ChanceStatus
  employeeId: number
  consumerId: number
}
