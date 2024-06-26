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
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ModuleRes } from '../models/module.res'

@Controller('modules')
@Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
@ApiTags('Modules')
export class ModulesController {
  constructor(
    @Inject(MODULES_SERVICE_PORT)
    private readonly modulesService: ModulesService,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all modules' })
  @ApiResponse({ status: 200, isArray: true, type: ModuleRes })
  async getModules() {
    return await this.modulesService.getModules()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get module by id' })
  @ApiResponse({ status: 200, type: ModuleRes })
  async getModuleById(@Param('id', ParseIntPipe) id: number) {
    return await this.modulesService.getModuleById(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create module' })
  @ApiResponse({ status: 201, type: ModuleRes })
  async createModule(@Body() module: CreateModuleReq) {
    return await this.modulesService.createModule(module)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update module' })
  @ApiResponse({ status: 200, type: ModuleRes })
  async updateModule(
    @Param('id', ParseIntPipe) id: number,
    @Body() module: UpdateModuleReq,
  ) {
    return await this.modulesService.updateModule(id, module)
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle module active' })
  @ApiResponse({ status: 200, type: Boolean })
  async toggleModuleActive(@Param('id', ParseIntPipe) id: number) {
    return await this.modulesService.toggleModuleActive(id)
  }
}
