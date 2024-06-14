import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'
import { CreateChanceReq } from '../models/create-chance.req'
import { ChancesService } from 'src/chances/application/chances.service'
import { CHANCES_SERVICE_PORT } from 'src/chances/shared/chances.consts'

@Controller('chances')
export class ChancesController {
  constructor(
    @Inject(CHANCES_SERVICE_PORT)
    private readonly chancesService: ChancesService,
  ) {}

  @Get()
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
}
