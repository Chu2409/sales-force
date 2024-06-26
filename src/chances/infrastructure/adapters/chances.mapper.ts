import { Chance } from '@prisma/client'
import { IChanceRes } from 'src/chances/domain/dtos/chance.res'
import { ChanceStatus } from 'src/chances/domain/models/chance.interface'
import {
  DelegationsMapper,
  IPrismaFullDelegation,
} from 'src/delegations/infrastructure/adapters/delegations.mapper'

interface IPrismaChance extends Chance {
  delegation: IPrismaFullDelegation
}

export class ChancesMapper {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static toRes({ delegationId, ...chance }: IPrismaChance): IChanceRes {
    return {
      ...chance,
      status: chance.status as ChanceStatus,
      delegation: DelegationsMapper.toFullRes(chance.delegation),
    }
  }
}
