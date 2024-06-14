import { Delegation } from '@prisma/client'
import {
  ConsumersMapper,
  IPrismaFullConsumer,
} from 'src/consumers/infrastructure/adapters/consumers.mapper'
import { IDelegationRes } from 'src/delegations/domain/dtos/delegation.res'
import { IFullDelegationRes } from 'src/delegations/domain/dtos/full-delegation.res'
import {
  EmployeesMapper,
  IPrismaFullEmployee,
} from 'src/employees/infrastructure/adapters/employees.mapper'

interface IPrismaWithConsumerDelegation extends Delegation {
  consumer: IPrismaFullConsumer
}

export interface IPrismaFullDelegation extends Delegation {
  consumer: IPrismaFullConsumer
  employee: IPrismaFullEmployee
}

export class DelegationsMapper {
  static toRes({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    consumerId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    employeeId,
    ...delegation
  }: IPrismaWithConsumerDelegation): IDelegationRes {
    return {
      ...delegation,
      consumer: ConsumersMapper.toRes(delegation.consumer),
    }
  }

  static toFullRes({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    consumerId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    employeeId,
    ...delegation
  }: IPrismaFullDelegation): IFullDelegationRes {
    return {
      ...delegation,

      consumer: ConsumersMapper.toRes(delegation.consumer),
      employee: EmployeesMapper.toRes(delegation.employee),
    }
  }
}
