import { ITask, TaskStatus } from '../models/task.interface'

export interface ICreateTaskDto
  extends Omit<
    ITask,
    'id' | 'status' | 'estimatedTime' | 'comments' | 'delegation' | 'createdAt'
  > {
  status?: TaskStatus
  estimatedTime?: number
  delegationId: number
}
