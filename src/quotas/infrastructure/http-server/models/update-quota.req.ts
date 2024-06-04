import { PartialType } from '@nestjs/swagger'
import { CreateQuotaReq } from './create-quota.req'
import { IUpdateQuotaDto } from 'src/quotas/domain/dtos/update-quota.dto'

export class UpdateQuotaReq
  extends PartialType(CreateQuotaReq)
  implements IUpdateQuotaDto {}
