import { PartialType } from '@nestjs/swagger'
import { CreateServiceReq } from './create-service.req'

export class UpdateServiceReq extends PartialType(CreateServiceReq) {}
