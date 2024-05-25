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
import { EmployeesService } from 'src/employees/application/employees.service'
import { CreateEmployeeDto } from './dtos/create-employee.dto'
import { UpdateEmployeeDto } from './dtos/update-employee.dto'
import { EmployeesMapper } from '../mappers/employees.mapper'

@Controller('employees')
export class EmployeesController {
  constructor(
    @Inject('IEmployeesServicePort')
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

  @Post()
  async createEmployee(@Body() employee: CreateEmployeeDto) {
    return await this.employeesService.createEmployee(
      EmployeesMapper.dtoToModel(employee),
    )
  }

  @Patch(':id')
  async updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() employee: UpdateEmployeeDto,
  ) {
    return await this.employeesService.updateEmployee(
      id,
      EmployeesMapper.dtoToModel(employee),
    )
  }

  @Delete(':id')
  async deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    return await this.employeesService.deleteEmployee(id)
  }
}
