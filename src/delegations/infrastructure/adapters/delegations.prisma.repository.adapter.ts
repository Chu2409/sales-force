import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IDelegationsRepositoryPort } from 'src/delegations/domain/ports/out/delegations.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { ICreateDelegationDto } from 'src/delegations/domain/dtos/create-delegation.dto'
import { IDelegationRes } from 'src/delegations/domain/dtos/delegation.res'
import { DelegationsMapper } from './delegations.mapper'
import { IFullDelegationRes } from 'src/delegations/domain/dtos/full-delegation.res'

@Injectable()
export class DelegationsPrismaRepositoryAdapter
  implements IDelegationsRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async createDelegation(delegation: ICreateDelegationDto): Promise<boolean> {
    const createdDelegation = await this.prismaService.delegation.create({
      data: {
        ...delegation,
      },
    })

    return !!createdDelegation
  }

  async getDelegationsByEmployeeId(
    employeeId: number,
  ): Promise<IDelegationRes[]> {
    const delegations = await this.prismaService.delegation.findMany({
      where: {
        employeeId,
      },
      include: {
        consumer: {
          include: {
            person: { include: { location: true } },
          },
        },
      },
    })

    return delegations.map((delegation) => DelegationsMapper.toRes(delegation))
  }

  async validateDelegationActiveExists(
    employeeId: number,
    consumerId: number,
  ): Promise<boolean> {
    const delegation = await this.prismaService.delegation.findFirst({
      where: {
        employeeId,
        consumerId,
        isActive: true,
      },
    })

    return !!delegation
  }

  async setDelegationActive(
    delegationId: number,
    state: boolean,
  ): Promise<boolean> {
    const updatedDelegation = await this.prismaService.delegation.update({
      where: {
        id: delegationId,
      },
      data: {
        isActive: state,
      },
    })

    return !!updatedDelegation
  }

  async getDelegationById(delegationId: number): Promise<IFullDelegationRes> {
    const delegation = await this.prismaService.delegation.findUnique({
      where: {
        id: delegationId,
      },
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
    })

    return delegation ? DelegationsMapper.toFullRes(delegation) : null
  }
}
