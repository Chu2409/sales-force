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
import { DelegationsService } from 'src/delegations/application/delegations.service'
import { DELEGATIONS_SERVICE_PORT } from 'src/delegations/shared/delegations.consts'
import { CreateDelegationReq } from '../models/create-delegation.req'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { DelegationRes } from '../models/delegation.res'
import { FullDelegationRes } from '../models/full-delegation.res'

@Controller('delegations')
@ApiTags('Delegations')
export class DelegationsController {
  constructor(
    @Inject(DELEGATIONS_SERVICE_PORT)
    private readonly delegationsService: DelegationsService,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all delegations' })
  @ApiResponse({ status: 200, isArray: true, type: DelegationRes })
  async getDelegations() {
    return await this.delegationsService.getDelegations()
  }

  @Get('employee/:employeeId')
  @Auth()
  @ApiOperation({ summary: 'Get delegations by employee id' })
  @ApiResponse({ status: 200, isArray: true, type: DelegationRes })
  async getDelegationsByEmployeeId(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    return await this.delegationsService.getDelegationsByEmployeeId(employeeId)
  }

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Create delegation' })
  @ApiResponse({ status: 200, type: Boolean })
  async createDelegation(@Body() delegation: CreateDelegationReq) {
    return await this.delegationsService.createDelegation(delegation)
  }

  @Patch(':delegationId/toggle-active')
  @Auth()
  @ApiOperation({ summary: 'Toggle delegation active' })
  @ApiResponse({ status: 200, type: Boolean })
  async toggleDelegationActive(
    @Param('delegationId', ParseIntPipe) delegationId: number,
  ) {
    return await this.delegationsService.toggleDelegationActive(delegationId)
  }

  @Get(':delegationId')
  @Auth()
  @ApiOperation({ summary: 'Get delegation by id' })
  @ApiResponse({ status: 200, type: FullDelegationRes })
  async getDelegationById(
    @Param('delegationId', ParseIntPipe) delegationId: number,
  ) {
    return await this.delegationsService.getDelegationById(delegationId)
  }
}
