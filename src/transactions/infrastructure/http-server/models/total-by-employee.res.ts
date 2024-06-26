import { ApiProperty } from '@nestjs/swagger'
import { ITotalByEmployeeRes } from 'src/transactions/domain/dtos/total-by-employee.res'
import { TransactionType } from 'src/transactions/domain/models/transaction.interface'

export class TotalByEmployeeRes implements ITotalByEmployeeRes {
  @ApiProperty({ enum: TransactionType })
  type: TransactionType

  @ApiProperty()
  total: number
}
