import { IDelegationRes } from 'src/delegations/domain/dtos/delegation.res'
import { ITask } from '../models/task.interface'

export interface ITaskRes extends Omit<ITask, 'delegation'> {
  delegation: IDelegationRes
}
