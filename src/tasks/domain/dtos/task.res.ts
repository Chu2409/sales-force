import { ITask } from '../models/task.interface'
import { IFullDelegationRes } from 'src/delegations/domain/dtos/full-delegation.res'

export interface ITaskRes extends Omit<ITask, 'delegation'> {
  delegation: IFullDelegationRes
}
