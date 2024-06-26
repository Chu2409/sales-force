import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common'
import { TransactionsService } from 'src/transactions/application/transactions.service'
import { TRANSACTIONS_SERVICE_PORT } from 'src/transactions/shared/transactions.consts'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TotalMonthlyRes } from '../models/total-monthly.res'

@Controller('transactions/reports')
@ApiTags('Transactions Reports')
export class TransactionsReportsController {
  constructor(
    @Inject(TRANSACTIONS_SERVICE_PORT)
    private readonly transactionsService: TransactionsService,
  ) {}

  @Get('total/:year')
  @ApiOperation({ summary: 'Get total monthly by year' })
  @ApiResponse({ status: 200, type: TotalMonthlyRes })
  async getTotal(@Param('year', ParseIntPipe) id: number) {
    return this.transactionsService.getTotalMonthlyByYear(id)
  }
}
