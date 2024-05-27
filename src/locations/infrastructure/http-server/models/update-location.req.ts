import { PartialType } from '@nestjs/swagger'
import { CreateLocationReq } from './create-location.req'

export class UpdateLocationReq extends PartialType(CreateLocationReq) {}
