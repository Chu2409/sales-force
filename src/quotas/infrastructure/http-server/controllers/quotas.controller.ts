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
import { CreateQuotaReq } from '../models/create-quota.req'
import { UpdateQuotaReq } from '../models/update-quota.req'
import { QuotasService } from 'src/quotas/application/quotas.service'
import { QUOTAS_SERVICE_PORT } from 'src/quotas/shared/quotas.consts'

@Controller('quotas')
export class QuotasController {
  constructor(
    @Inject(QUOTAS_SERVICE_PORT)
    private readonly quotasService: QuotasService,
  ) {}

  @Get()
  async getQuotas() {
    return await this.quotasService.getQuotas()
  }

  @Get('employee/:employeeId')
  async getQuotasByEmployeeId(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    return await this.quotasService.getQuotasByEmployeeId(employeeId)
  }

  @Get(':id')
  async getQuotaById(@Param('id', ParseIntPipe) id: number) {
    return await this.quotasService.getQuotaById(id)
  }

  @Post()
  async createQuota(@Body() quota: CreateQuotaReq) {
    return await this.quotasService.createQuota(quota)
  }

  @Patch(':id')
  async updateQuota(
    @Param('id', ParseIntPipe) id: number,
    @Body() quota: UpdateQuotaReq,
  ) {
    return await this.quotasService.updateQuota(id, quota)
  }

  @Patch(':id/toggle-active')
  async toggleQuotaActive(@Param('id', ParseIntPipe) id: number) {
    return await this.quotasService.toggleQuotaActive(id)
  }
}
