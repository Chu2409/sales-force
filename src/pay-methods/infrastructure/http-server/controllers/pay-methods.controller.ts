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
import { PayMethodsService } from 'src/pay-methods/application/pay-methods.service'
import { CreatePayMethodReq } from '../models/create-pay-method.dto'
import { UpdatePayMethoReq } from '../models/update-pay-method.dto'
import { PAY_METHODS_SERVICE_PORT } from 'src/pay-methods/shared/pay-methods-providers.consts'

@Controller('pay-methods')
export class PayMethodsController {
  constructor(
    @Inject(PAY_METHODS_SERVICE_PORT)
    private readonly payMethodsService: PayMethodsService,
  ) {}

  @Get()
  async getPayMethods() {
    return await this.payMethodsService.getPayMethods()
  }

  @Get(':id')
  async getPayMethodById(@Param('id', ParseIntPipe) id: number) {
    return await this.payMethodsService.getPayMethodById(id)
  }

  @Post()
  async createPayMethod(@Body() payMethod: CreatePayMethodReq) {
    return await this.payMethodsService.createPayMethod(payMethod)
  }

  @Patch(':id')
  async updatePayMethod(
    @Param('id', ParseIntPipe) id: number,
    @Body() payMethod: UpdatePayMethoReq,
  ) {
    return await this.payMethodsService.updatePayMethod(id, payMethod)
  }

  @Delete(':id')
  async deletePayMethod(@Param('id', ParseIntPipe) id: number) {
    return await this.payMethodsService.deletePayMethod(id)
  }
}