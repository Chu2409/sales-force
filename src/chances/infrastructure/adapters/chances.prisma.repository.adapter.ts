import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IChancesRepositoryPort } from 'src/chances/domain/ports/out/chances.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { IChanceRes } from 'src/chances/domain/dtos/chance.res'
import { ICreateChanceDto } from 'src/chances/domain/dtos/create-chance.dto'
import { ChanceStatus } from '@prisma/client'
import { ChancesMapper } from './chances.mapper'

@Injectable()
export class ChancesPrismaRepositoryAdapter implements IChancesRepositoryPort {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async createChance(chance: ICreateChanceDto): Promise<IChanceRes> {
    const createdChance = await this.prismaService.chance.create({
      data: {
        amount: chance.amount,
        date: chance.date,
        delegationId: chance.delegationId,
        status: chance.status as ChanceStatus,
      },
      include: {
        delegation: {
          include: {
            consumer: {
              include: {
                person: { include: { location: true } },
              },
            },
            employee: {
              include: {
                person: { include: { location: true } },
              },
            },
          },
        },
      },
    })

    return createdChance ? ChancesMapper.toRes(createdChance) : null
  }

  async deleteChance(id: number): Promise<boolean> {
    const deletedChance = await this.prismaService.chance.delete({
      where: { id },
    })

    return !!deletedChance
  }

  async getChances(): Promise<IChanceRes[]> {
    const chances = await this.prismaService.chance.findMany({
      include: {
        delegation: {
          include: {
            consumer: {
              include: {
                person: { include: { location: true } },
              },
            },
            employee: {
              include: {
                person: { include: { location: true } },
              },
            },
          },
        },
      },
    })

    return chances.map((chance) => ChancesMapper.toRes(chance))
  }

  async getChanceById(id: number): Promise<IChanceRes> {
    const chance = await this.prismaService.chance.findUnique({
      where: { id },
      include: {
        delegation: {
          include: {
            consumer: {
              include: {
                person: { include: { location: true } },
              },
            },
            employee: {
              include: {
                person: { include: { location: true } },
              },
            },
          },
        },
      },
    })

    return chance ? ChancesMapper.toRes(chance) : null
  }
}
