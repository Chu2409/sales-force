import { PartialType } from '@nestjs/swagger'
import { CreatePersonReq } from './create-person.req'
import { IUpdatePersonDto } from 'src/people/domain/dtos/update-person.dto'

export class UpdatePersonReq
  extends PartialType(CreatePersonReq)
  implements IUpdatePersonDto {}
