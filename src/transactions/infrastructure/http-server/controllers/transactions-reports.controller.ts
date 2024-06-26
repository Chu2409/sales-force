import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common'
import { TransactionsService } from 'src/transactions/application/transactions.service'
import { TRANSACTIONS_SERVICE_PORT } from 'src/transactions/shared/transactions.consts'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TotalMonthlyRes } from '../models/total-monthly.res'
import { TotalByEmployeeRes } from '../models/total-by-employee.res'

@Controller('transactions/reports')
@ApiTags('Transactions Reports')
export class TransactionsReportsController {
  constructor(
    @Inject(TRANSACTIONS_SERVICE_PORT)
    private readonly transactionsService: TransactionsService,
  ) {}

  @Get('total/year/:year')
  @ApiOperation({ summary: 'Get total monthly by year' })
  @ApiResponse({ status: 200, type: TotalMonthlyRes })
  async getTotal(@Param('year', ParseIntPipe) id: number) {
    return this.transactionsService.getTotalMonthlyByYear(id)
  }

  @Get('total/employee/:id')
  @ApiOperation({ summary: 'Get total by employee' })
  @ApiResponse({ status: 200, type: TotalByEmployeeRes, isArray: true })
  async getTotalByEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.getTotalByEmployeeId(id)
  }
}
