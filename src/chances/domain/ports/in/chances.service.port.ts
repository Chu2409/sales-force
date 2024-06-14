import { IChanceRes } from '../../dtos/chance.res'
import { ICreateChanceInDto } from '../../dtos/create-chance.in.dto'

export interface IChancesServicePort {
  createChance(chance: ICreateChanceInDto): Promise<IChanceRes>
  deleteChance(id: number): Promise<boolean>
  getChances(): Promise<IChanceRes[]>
  getChanceById(id: number): Promise<IChanceRes>
}
