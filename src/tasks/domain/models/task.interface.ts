import { IDelegation } from 'src/delegations/domain/models/delegation.interface'

export enum TaskStatus {
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
  RESCHEDULED = 'RESCHEDULED',
}

export enum TaskType {
  VISIT = 'VISIT',
  CALL = 'CALL',
}

interface IComment {
  id: number
  content: string
}

export interface ITask {
  id: number
  date: Date
  createdAt: Date
  status: TaskStatus | null
  type: TaskType
  estimatedTime: number | null
  delegation: IDelegation
  comments: IComment[]
}
