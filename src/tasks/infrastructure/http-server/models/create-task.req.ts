import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty({ enum: TaskStatus, required: false })
  status?: TaskStatus

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(15)
  @ApiProperty({ minimum: 15, required: false })
  estimatedTime?: number

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  date: Date

  @IsEnum(TaskType)
  @ApiProperty({ enum: TaskType })
  type: TaskType

  @IsPositive()
  @ApiProperty()
  delegationId: number
}
