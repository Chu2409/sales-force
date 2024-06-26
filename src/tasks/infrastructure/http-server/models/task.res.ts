import { ApiProperty } from '@nestjs/swagger'
import { DelegationRes } from 'src/delegations/infrastructure/http-server/models/delegation.res'
import { ITaskRes } from 'src/tasks/domain/dtos/task.res'
import { TaskStatus, TaskType } from 'src/tasks/domain/models/task.interface'
import { CommentRes } from './comment.res'

export class TaskRes implements ITaskRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  date: Date

  @ApiProperty()
  createdAt: Date

  @ApiProperty({ enum: TaskStatus, nullable: true })
  status: TaskStatus | null

  @ApiProperty({ enum: TaskType })
  type: TaskType

  @ApiProperty({ nullable: true })
  estimatedTime: number | null

  @ApiProperty()
  delegation: DelegationRes

  @ApiProperty({ isArray: true })
  comments: CommentRes[]
}
