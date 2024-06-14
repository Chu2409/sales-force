import { ICreateDelegationDto } from '../../dtos/create-delegation.dto'
import { IDelegationRes } from '../../dtos/delegation.res'
import { IFullDelegationRes } from '../../dtos/full-delegation.res'

export interface IDelegationsRepositoryPort {
  createDelegation(delegation: ICreateDelegationDto): Promise<boolean>
  getDelegationsByEmployeeId(employeeId: number): Promise<IDelegationRes[]>
  validateDelegationActiveExists(
    employeeId: number,
    consumerId: number,
  ): Promise<boolean>
  setDelegationActive(delegationId: number, state: boolean): Promise<boolean>
  getDelegationById(delegationId: number): Promise<IFullDelegationRes>
  getDelegationByEmployeeIdAndConsumerId(
    employeeId: number,
    consumerId: number,
  ): Promise<IFullDelegationRes>
}
