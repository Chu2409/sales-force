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
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { QuotaRes } from '../models/quota.res'
import { QuotaWithEmployeeRes } from '../models/quota-with-employee.res'

@Controller('quotas')
@ApiTags('Quotas')
export class QuotasController {
  constructor(
    @Inject(QUOTAS_SERVICE_PORT)
    private readonly quotasService: QuotasService,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all quotas' })
  @ApiResponse({ status: 200, isArray: true, type: QuotaWithEmployeeRes })
  async getQuotas() {
    return await this.quotasService.getQuotas()
  }

  @Get('employee/:employeeId')
  @Auth()
  @ApiOperation({ summary: 'Get quotas by employee id' })
  @ApiResponse({ status: 200, isArray: true, type: QuotaRes })
  async getQuotasByEmployeeId(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    return await this.quotasService.getQuotasByEmployeeId(employeeId)
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Get quota by id' })
  @ApiResponse({ status: 200, type: QuotaWithEmployeeRes })
  async getQuotaById(@Param('id', ParseIntPipe) id: number) {
    return await this.quotasService.getQuotaById(id)
  }

  @Post()
  @Auth(EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Create quota' })
  @ApiResponse({ status: 200, type: QuotaWithEmployeeRes })
  async createQuota(@Body() quota: CreateQuotaReq) {
    return await this.quotasService.createQuota(quota)
  }

  @Patch(':id')
  @Auth(EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Update quota' })
  @ApiResponse({ status: 200, type: QuotaWithEmployeeRes })
  async updateQuota(
    @Param('id', ParseIntPipe) id: number,
    @Body() quota: UpdateQuotaReq,
  ) {
    return await this.quotasService.updateQuota(id, quota)
  }

  @Patch(':id/toggle-active')
  @Auth(EmployeeRole.ADMIN)
  @ApiOperation({ summary: 'Toggle quota active' })
  @ApiResponse({ status: 200, type: Boolean })
  async toggleQuotaActive(@Param('id', ParseIntPipe) id: number) {
    return await this.quotasService.toggleQuotaActive(id)
  }
}
