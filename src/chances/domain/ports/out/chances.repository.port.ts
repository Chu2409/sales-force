import { IChanceRes } from '../../dtos/chance.res'
import { ICreateChanceDto } from '../../dtos/create-chance.dto'
import { ChanceStatus } from '../../models/chance.interface'

export interface IChancesRepositoryPort {
  createChance(chance: ICreateChanceDto): Promise<IChanceRes>
  deleteChance(id: number): Promise<boolean>
  getChances(): Promise<IChanceRes[]>
  getChanceById(id: number): Promise<IChanceRes>
  updateStatus(id: number, status: ChanceStatus): Promise<IChanceRes>
}
