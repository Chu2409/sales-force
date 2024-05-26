import { PartialType } from '@nestjs/swagger'
import { CreatePayMethodReq } from './create-pay-method.dto'

export class UpdatePayMethoReq extends PartialType(CreatePayMethodReq) {}
