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

@Controller('delegations')
export class DelegationsController {
  constructor(
    @Inject(DELEGATIONS_SERVICE_PORT)
    private readonly delegationsService: DelegationsService,
  ) {}

  @Get('employee/:employeeId')
  async getDelegationsByEmployeeId(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    return await this.delegationsService.getDelegationsByEmployeeId(employeeId)
  }

  @Post()
  async createDelegation(@Body() delegation: CreateDelegationReq) {
    return await this.delegationsService.createDelegation(delegation)
  }

  @Patch(':delegationId/toggle-active')
  async toggleDelegationActive(
    @Param('delegationId', ParseIntPipe) delegationId: number,
  ) {
    return await this.delegationsService.toggleDelegationActive(delegationId)
  }

  @Get(':delegationId')
  async getDelegationById(
    @Param('delegationId', ParseIntPipe) delegationId: number,
  ) {
    return await this.delegationsService.getDelegationById(delegationId)
  }
}
