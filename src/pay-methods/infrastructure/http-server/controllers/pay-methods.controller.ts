import {
  Body,
  Controller,
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
import { PAY_METHODS_SERVICE_PORT } from 'src/pay-methods/shared/pay-methods.consts'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PayMethodRes } from '../models/pay-method.res'

@Controller('pay-methods')
@Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
@ApiTags('Pay Methods')
export class PayMethodsController {
  constructor(
    @Inject(PAY_METHODS_SERVICE_PORT)
    private readonly payMethodsService: PayMethodsService,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all pay methods' })
  @ApiResponse({ status: 200, isArray: true, type: PayMethodRes })
  async getPayMethods() {
    return await this.payMethodsService.getPayMethods()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pay method by id' })
  @ApiResponse({ status: 200, type: PayMethodRes })
  async getPayMethodById(@Param('id', ParseIntPipe) id: number) {
    return await this.payMethodsService.getPayMethodById(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create pay method' })
  @ApiResponse({ status: 200, type: PayMethodRes })
  async createPayMethod(@Body() payMethod: CreatePayMethodReq) {
    return await this.payMethodsService.createPayMethod(payMethod)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update pay method' })
  @ApiResponse({ status: 200, type: PayMethodRes })
  async updatePayMethod(
    @Param('id', ParseIntPipe) id: number,
    @Body() payMethod: UpdatePayMethoReq,
  ) {
    return await this.payMethodsService.updatePayMethod(id, payMethod)
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle pay method active' })
  @ApiResponse({ status: 200, type: Boolean })
  async togglePayMethodActive(@Param('id', ParseIntPipe) id: number) {
    return await this.payMethodsService.togglePayMethodActive(id)
  }
}
