import { ChanceStatus, IChance } from '../models/chance.interface'

export interface ICreateChanceDto
  extends Omit<IChance, 'id' | 'delegation' | 'status'> {
  status?: ChanceStatus
  delegationId: number
}
