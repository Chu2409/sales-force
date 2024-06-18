import { Type } from 'class-transformer'
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator'
import { ICreateTaskDto } from 'src/tasks/domain/dtos/create-task.dto'
import { TaskStatus, TaskType } from 'src/tasks/domain/models/task.interface'

export class CreateTaskReq implements ICreateTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(15)
  estimatedTime?: number

  @IsDate()
  @Type(() => Date)
  date: Date

  @IsEnum(TaskType)
  type: TaskType

  @IsPositive()
  delegationId: number
}
