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

@Controller('employees')
export class EmployeesController {
  constructor(
    @Inject(EMPLOYEES_SERVICE_PORT)
    private readonly employeesService: EmployeesService,
  ) {}

  @Get()
  async getEmployees() {
    return await this.employeesService.getEmployees()
  }

  @Get(':id')
  async getEmployeeById(@Param('id', ParseIntPipe) id: number) {
    return await this.employeesService.getEmployeeById(id)
  }

  @Get(':id/permissions')
  async getPermissionsByEmployeeId(@Param('id', ParseIntPipe) id: number) {
    return await this.employeesService.getPermissionsByEmployeeId(id)
  }

  @Post(':id/permissions')
  async assignPermission(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignPermissionReq,
  ) {
    return await this.employeesService.assignPermission(id, dto)
  }

  @Post()
  async createEmployee(@Body() employee: CreateEmployeeReq) {
    return await this.employeesService.createEmployee(employee)
  }

  @Patch(':id')
  async updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() employee: UpdateEmployeeReq,
  ) {
    return await this.employeesService.updateEmployee(id, employee)
  }

  @Patch(':id/toggle-active')
  async toggleEmployeeActive(@Param('id', ParseIntPipe) id: number) {
    return await this.employeesService.toggleEmployeeActive(id)
  }
}
