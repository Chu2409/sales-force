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
import { EmployeesService } from 'src/employees/application/employees.service'
import { EMPLOYEES_SERVICE_PORT } from 'src/employees/shared/employees.consts'
import { CreateEmployeeReq } from '../models/create-employee.req'
import { UpdateEmployeeReq } from '../models/update-employee.req'
import { AssignPermissionReq } from '../models/assign-permission.req'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { EmployeeRes } from '../models/employee.res'
import { ModuleRes } from 'src/modules/infrastructure/http-server/models/module.res'

@Controller('employees')
@Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
@ApiTags('Employees')
export class EmployeesController {
  constructor(
    @Inject(EMPLOYEES_SERVICE_PORT)
    private readonly employeesService: EmployeesService,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: 200, isArray: true, type: EmployeeRes })
  async getEmployees() {
    return await this.employeesService.getEmployees()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee by id' })
  @ApiResponse({ status: 200, type: EmployeeRes })
  async getEmployeeById(@Param('id', ParseIntPipe) id: number) {
    return await this.employeesService.getEmployeeById(id)
  }

  @Get(':id/permissions')
  @ApiOperation({ summary: 'Get permissions by employee id' })
  @ApiResponse({ status: 200, isArray: true, type: ModuleRes })
  async getPermissionsByEmployeeId(@Param('id', ParseIntPipe) id: number) {
    return await this.employeesService.getPermissionsByEmployeeId(id)
  }

  @Post(':id/permissions')
  @ApiOperation({ summary: 'Assign permission' })
  @ApiResponse({ status: 200, type: Boolean })
  async assignPermission(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignPermissionReq,
  ) {
    return await this.employeesService.assignPermission(id, dto)
  }

  @Post()
  @ApiOperation({ summary: 'Create employee' })
  @ApiResponse({ status: 201, type: EmployeeRes })
  async createEmployee(@Body() employee: CreateEmployeeReq) {
    return await this.employeesService.createEmployee(employee)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update employee' })
  @ApiResponse({ status: 200, type: EmployeeRes })
  async updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() employee: UpdateEmployeeReq,
  ) {
    return await this.employeesService.updateEmployee(id, employee)
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle employee active' })
  @ApiResponse({ status: 200, type: Boolean })
  async toggleEmployeeActive(@Param('id', ParseIntPipe) id: number) {
    return await this.employeesService.toggleEmployeeActive(id)
  }
}
