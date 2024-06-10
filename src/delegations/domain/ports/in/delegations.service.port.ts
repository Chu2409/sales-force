import { ICreateDelegationDto } from '../../dtos/create-delegation.dto'
import { IDelegationRes } from '../../dtos/delegation.res'
import { IFullDelegationRes } from '../../dtos/full-delegation.res'

export interface IDelegationsServicePort {
  createDelegation(delegation: ICreateDelegationDto): Promise<boolean>
  getDelegationsByEmployeeId(employeeId: number): Promise<IDelegationRes[]>
  toggleDelegationActive(delegationId: number): Promise<boolean>
  getDelegationById(delegationId: number): Promise<IFullDelegationRes>
}
