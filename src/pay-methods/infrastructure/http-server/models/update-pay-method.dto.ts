import { PartialType } from '@nestjs/swagger'
import { CreatePayMethodReq } from './create-pay-method.dto'
import { IUpdatePayMethodDto } from 'src/pay-methods/domain/dtos/update-pay-method.dto'

export class UpdatePayMethoReq
  extends PartialType(CreatePayMethodReq)
  implements IUpdatePayMethodDto {}
