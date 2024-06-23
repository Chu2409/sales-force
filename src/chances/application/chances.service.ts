import { Inject, Injectable } from '@nestjs/common'
import { IChancesServicePort } from '../domain/ports/in/chances.service.port'
import { IChancesRepositoryPort } from '../domain/ports/out/chances.repository.port'
import { IChanceRes } from '../domain/dtos/chance.res'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'
import { CHANCES_REPOSITORY_PORT } from 'src/chances/shared/chances.consts'
import { DELEGATIONS_SERVICE_PORT } from 'src/delegations/shared/delegations.consts'
import { IDelegationsServicePort } from 'src/delegations/domain/ports/in/delegations.service.port'
import { ICreateChanceInDto } from '../domain/dtos/create-chance.in.dto'
import { ChanceStatus } from '../domain/models/chance.interface'

@Injectable()
export class ChancesService implements IChancesServicePort {
  constructor(
    @Inject(CHANCES_REPOSITORY_PORT)
    private readonly repository: IChancesRepositoryPort,
    @Inject(DELEGATIONS_SERVICE_PORT)
    private readonly delegationsService: IDelegationsServicePort,
  ) {}

  async createChance(chance: ICreateChanceInDto): Promise<IChanceRes> {
    let delegation =
      await this.delegationsService.getDelegationByEmployeeIdAndConsumerId(
        chance.employeeId,
        chance.consumerId,
      )

    if (!delegation) {
      const createdDelegation = await this.delegationsService.createDelegation({
        employeeId: chance.employeeId,
        consumerId: chance.consumerId,
      })
      if (!createdDelegation)
        throw new AppError(
          'Delegation could not be created',
          Errors.INTERNAL_SERVER_ERROR,
        )

      delegation =
        await this.delegationsService.getDelegationByEmployeeIdAndConsumerId(
          chance.employeeId,
          chance.consumerId,
        )
    }

    const createdChance = await this.repository.createChance({
      ...chance,
      delegationId: delegation.id,
    })
    if (!createdChance)
      throw new AppError(
        'Chance could not be created',
        Errors.INTERNAL_SERVER_ERROR,
      )

    return createdChance
  }

  async deleteChance(id: number): Promise<boolean> {
    await this.getChanceById(id)

    return await this.repository.deleteChance(id)
  }

  async getChances(): Promise<IChanceRes[]> {
    return await this.repository.getChances()
  }

  async getChanceById(id: number): Promise<IChanceRes> {
    const chance = await this.repository.getChanceById(id)
    if (!chance) throw new AppError('Chance not found', Errors.NOT_FOUND)

    return chance
  }

  async updateStatus(id: number, status: ChanceStatus): Promise<boolean> {
    const chance = await this.getChanceById(id)

    if (!chance) return false

    const chanceUpdated = await this.repository.updateStatus(id, status)

    return !!chanceUpdated
  }
}
