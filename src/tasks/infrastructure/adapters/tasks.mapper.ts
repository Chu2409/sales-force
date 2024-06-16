import { Comment, Task } from '@prisma/client'
import {
  DelegationsMapper,
  IPrismaFullDelegation,
} from 'src/delegations/infrastructure/adapters/delegations.mapper'
import { ITaskRes } from 'src/tasks/domain/dtos/task.res'
import { TaskStatus, TaskType } from 'src/tasks/domain/models/task.interface'

interface IPrismaFullTask extends Task {
  delegation: IPrismaFullDelegation
  comments: Comment[]
}

export class TasksMapper {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static toRes({ delegationId, ...task }: IPrismaFullTask): ITaskRes {
    return {
      ...task,
      status: task.status as TaskStatus,
      type: task.type as TaskType,
      delegation: DelegationsMapper.toFullRes(task.delegation),
    }
  }
}
