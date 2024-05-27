import { PartialType } from '@nestjs/swagger'
import { CreateEmployeeReq } from './create-employee.req'

export class UpdateEmployeeReq extends PartialType(CreateEmployeeReq) {}
