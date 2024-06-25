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
import { CreateChanceReq } from '../models/create-chance.req'
import { ChancesService } from 'src/chances/application/chances.service'
import { CHANCES_SERVICE_PORT } from 'src/chances/shared/chances.consts'
import { ChanceStatus } from 'src/chances/domain/models/chance.interface'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'

@Controller('chances')
@Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
export class ChancesController {
  constructor(
    @Inject(CHANCES_SERVICE_PORT)
    private readonly chancesService: ChancesService,
  ) {}

  @Get()
  @Auth()
  async getChances() {
    return await this.chancesService.getChances()
  }

  @Get(':id')
  async getChanceById(@Param('id', ParseIntPipe) id: number) {
    return await this.chancesService.getChanceById(id)
  }

  @Post()
  async createChance(@Body() chance: CreateChanceReq) {
    return await this.chancesService.createChance(chance)
  }

  @Delete(':id')
  async deleteChance(@Param('id', ParseIntPipe) id: number) {
    return await this.chancesService.deleteChance(id)
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: ChanceStatus,
  ) {
    return await this.chancesService.updateStatus(id, status)
  }
}
