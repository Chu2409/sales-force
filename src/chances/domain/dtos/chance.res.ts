import { IFullDelegationRes } from 'src/delegations/domain/dtos/full-delegation.res'
import { IChance } from '../models/chance.interface'

export interface IChanceRes extends Omit<IChance, 'delegation'> {
  delegation: IFullDelegationRes
}
