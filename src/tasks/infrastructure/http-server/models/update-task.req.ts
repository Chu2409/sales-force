import { PartialType } from '@nestjs/swagger'
import { CreateTaskReq } from './create-task.req'
import { IUpdateTaskDto } from 'src/tasks/domain/dtos/update-task.dto'

export class UpdateTaskReq
  extends PartialType(CreateTaskReq)
  implements IUpdateTaskDto {}
