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

@Controller('transactions')
@Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
export class TransactionsController {
  constructor(
    @Inject(TRANSACTIONS_SERVICE_PORT)
    private readonly transactionsService: TransactionsService,
  ) {}

  @Get(':id')
  async getTransactionById(@Param('id', ParseIntPipe) id: number) {
    return await this.transactionsService.getTransactionById(id)
  }

  @Get()
  @Auth()
  async getTransactions() {
    return await this.transactionsService.getTransactions()
  }

  @Post()
  async createTransaction(@Body() transaction: CreateTransactionReq) {
    return await this.transactionsService.createTransaction(transaction)
  }

  @Patch(':id')
  async updateTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() transaction: UpdateTransactionReq,
  ) {
    return await this.transactionsService.updateTransaction(id, transaction)
  }

  @Delete(':id')
  async deleteTransaction(@Param('id', ParseIntPipe) id: number) {
    return await this.transactionsService.deleteTransaction(id)
  }
}
