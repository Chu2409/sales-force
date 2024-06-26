import { IDelegation } from 'src/delegations/domain/models/delegation.interface'

export enum ChanceStatus {
  WON = 'WON',
  LOST = 'LOST',
}

export interface IChance {
  id: number
  amount: number
  status: ChanceStatus | null
  date: Date
  delegation: IDelegation
}
