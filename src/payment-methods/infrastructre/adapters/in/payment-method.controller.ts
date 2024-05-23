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
import { CreatePaymentMethodDto } from './dtos/create-payment-method.dto'
import { PaymentMethodsMapper } from '../mappers/payment-methods.mapper'
import { UpdatePaymentMethodDto } from './dtos/update-payment-method.dto'
import { PaymentMethodService } from 'src/payment-methods/application/payment.-methods.service'

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(
    @Inject('IPaymentMethodsServicePort')
    private readonly paymentMethodsService: PaymentMethodService,
  ) {}

  @Get()
  async getPaymentMethods() {
    return await this.paymentMethodsService.getPaymentMethods()
  }

  @Get(':id')
  async getPaymentMethodById(@Param('id', ParseIntPipe) id: number) {
    return await this.paymentMethodsService.getPaymentMethodById(id)
  }

  @Post()
  async createPaymentMethod(@Body() brand: CreatePaymentMethodDto) {
    return await this.paymentMethodsService.createPaymentMethod(
      PaymentMethodsMapper.dtoToModel(brand),
    )
  }

  @Patch(':id')
  async updatePaymentMethod(
    @Param('id', ParseIntPipe) id: number,
    @Body() brand: UpdatePaymentMethodDto,
  ) {
    return await this.paymentMethodsService.updatePaymentMethod(
      id,
      PaymentMethodsMapper.dtoToModel(brand),
    )
  }

  @Delete(':id')
  async deletePaymentMethod(@Param('id', ParseIntPipe) id: number) {
    return await this.paymentMethodsService.deletePaymentMethod(id)
  }
}
