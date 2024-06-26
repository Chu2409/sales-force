import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { TransactionsService } from 'src/transactions/application/transactions.service'
import { TRANSACTIONS_SERVICE_PORT } from 'src/transactions/shared/transactions.consts'
import { CreateTransactionReq } from '../models/create-transaction.req'
import { UpdateTransactionReq } from '../models/update-transaction.req'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TransactionRes } from '../models/transaction.res'

@Controller('transactions')
@Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
@ApiTags('Transactions')
export class TransactionsController {
  constructor(
    @Inject(TRANSACTIONS_SERVICE_PORT)
    private readonly transactionsService: TransactionsService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by id' })
  @ApiResponse({ status: 200, type: TransactionRes })
  async getTransactionById(@Param('id', ParseIntPipe) id: number) {
    return await this.transactionsService.getTransactionById(id)
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, isArray: true, type: TransactionRes })
  async getTransactions() {
    return await this.transactionsService.getTransactions()
  }

  @Post()
  @ApiOperation({ summary: 'Create transaction' })
  @ApiResponse({ status: 201, type: TransactionRes })
  async createTransaction(@Body() transaction: CreateTransactionReq) {
    return await this.transactionsService.createTransaction(transaction)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update transaction' })
  @ApiResponse({ status: 200, type: TransactionRes })
  async updateTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() transaction: UpdateTransactionReq,
  ) {
    return await this.transactionsService.updateTransaction(id, transaction)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete transaction' })
  @ApiResponse({ status: 200, type: Boolean })
  async deleteTransaction(@Param('id', ParseIntPipe) id: number) {
    return await this.transactionsService.deleteTransaction(id)
  }
}
