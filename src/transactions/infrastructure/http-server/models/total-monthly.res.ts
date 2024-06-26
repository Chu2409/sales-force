import { ApiProperty } from '@nestjs/swagger'
import { ITotalMonthlyRes } from 'src/transactions/domain/dtos/total-monthly.res'

export class TotalMonthlyRes implements ITotalMonthlyRes {
  [month: number]: number

  @ApiProperty({
    example: { 1: 100, 2: 200 },
    description:
      'Dynamic monthly totals, where the key is the month number and the value is the total for that month.',
  })
  monthlyTotalsExample?: { [month: number]: number }
}
