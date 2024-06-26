import { ApiProperty } from '@nestjs/swagger'
import { IComment } from 'src/tasks/domain/models/task.interface'

export class CommentRes implements IComment {
  @ApiProperty()
  id: number

  @ApiProperty()
  content: string
}
