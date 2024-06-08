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
import { ModulesService } from 'src/modules/application/modules.service'
import { MODULES_SERVICE_PORT } from 'src/modules/shared/modules.consts'
import { CreateModuleReq } from '../models/create-module.req'
import { UpdateModuleReq } from '../models/update-module.req'

@Controller('modules')
export class ModulesController {
  constructor(
    @Inject(MODULES_SERVICE_PORT)
    private readonly modulesService: ModulesService,
  ) {}

  @Get()
  async getModules() {
    return await this.modulesService.getModules()
  }

  @Get(':id')
  async getModuleById(@Param('id', ParseIntPipe) id: number) {
    return await this.modulesService.getModuleById(id)
  }

  @Post()
  async createModule(@Body() module: CreateModuleReq) {
    return await this.modulesService.createModule(module)
  }

  @Patch(':id')
  async updateModule(
    @Param('id', ParseIntPipe) id: number,
    @Body() module: UpdateModuleReq,
  ) {
    return await this.modulesService.updateModule(id, module)
  }

  @Patch(':id/toggle-active')
  async toggleModuleActive(@Param('id', ParseIntPipe) id: number) {
    return await this.modulesService.toggleModuleActive(id)
  }
}
