import { IChanceRes } from '../../dtos/chance.res'
import { ICreateChanceDto } from '../../dtos/create-chance.dto'

export interface IChancesRepositoryPort {
  createChance(chance: ICreateChanceDto): Promise<IChanceRes>
  deleteChance(id: number): Promise<boolean>
  getChances(): Promise<IChanceRes[]>
  getChanceById(id: number): Promise<IChanceRes>
}
