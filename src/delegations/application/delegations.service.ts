import { Inject, Injectable } from '@nestjs/common'
import { IDelegationsServicePort } from '../domain/ports/in/delegations.service.port'
import { IDelegationsRepositoryPort } from '../domain/ports/out/delegations.repository.port'
import { ICreateDelegationDto } from '../domain/dtos/create-delegation.dto'
import { IDelegationRes } from '../domain/dtos/delegation.res'
import { DELEGATIONS_REPOSITORY_PORT } from '../shared/delegations.consts'
import { EMPLOYEES_SERVICE_PORT } from 'src/employees/shared/employees.consts'
import { IEmployeesServicePort } from 'src/employees/domain/ports/in/employees.service.port'
import { CONSUMERS_SERVICE_PORT } from 'src/consumers/shared/consumers.consts'
import { IConsumersServicePort } from 'src/consumers/domain/ports/in/consumers.service.port'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'
import { IFullDelegationRes } from '../domain/dtos/full-delegation.res'

@Injectable()
export class DelegationsService implements IDelegationsServicePort {
  constructor(
    @Inject(DELEGATIONS_REPOSITORY_PORT)
    private readonly repository: IDelegationsRepositoryPort,
    @Inject(EMPLOYEES_SERVICE_PORT)
    private readonly employeesService: IEmployeesServicePort,
    @Inject(CONSUMERS_SERVICE_PORT)
    private readonly consumersService: IConsumersServicePort,
  ) {}

  async createDelegation(delegation: ICreateDelegationDto): Promise<boolean> {
    await this.employeesService.getEmployeeById(delegation.employeeId)
    await this.consumersService.getConsumerById(delegation.consumerId)

    const delegationExists =
      await this.repository.validateDelegationActiveExists(
        delegation.employeeId,
        delegation.consumerId,
      )
    if (delegationExists)
      throw new AppError('Delegation already exists', Errors.BAD_REQUEST)

    return await this.repository.createDelegation(delegation)
  }

  async getDelegationsByEmployeeId(
    employeeId: number,
  ): Promise<IDelegationRes[]> {
    await this.employeesService.getEmployeeById(employeeId)

    return await this.repository.getDelegationsByEmployeeId(employeeId)
  }

  async getDelegationById(delegationId: number): Promise<IFullDelegationRes> {
    const delegation = await this.repository.getDelegationById(delegationId)
    if (!delegation)
      throw new AppError('Delegation not found', Errors.NOT_FOUND)

    return delegation
  }

  async toggleDelegationActive(delegationId: number): Promise<boolean> {
    const delegation = await this.getDelegationById(delegationId)
    if (!delegation.isActive) {
      const delegationExists =
        await this.repository.validateDelegationActiveExists(
          delegation.consumer.id,
          delegation.employee.id,
        )
      if (delegationExists)
        throw new AppError('Delegation already exists', Errors.BAD_REQUEST)
    }

    return await this.repository.setDelegationActive(
      delegation.id,
      !delegation.isActive,
    )
  }

  async getDelegationByEmployeeIdAndConsumerId(
    employeeId: number,
    consumerId: number,
  ): Promise<IFullDelegationRes> {
    await this.employeesService.getEmployeeById(employeeId)
    await this.consumersService.getConsumerById(consumerId)

    return await this.repository.getDelegationByEmployeeIdAndConsumerId(
      employeeId,
      consumerId,
    )
  }
}
