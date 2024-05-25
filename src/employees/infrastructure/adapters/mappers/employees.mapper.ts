import { Employee } from '@prisma/client'
import {
  EmployeeModel,
  EmployeeRoleModel,
} from 'src/employees/domain/models/employee'
import { CreateEmployeeDto } from '../in/dtos/create-employee.dto'
import { UpdateEmployeeDto } from '../in/dtos/update-employee.dto'

export class EmployeesMapper {
  public static toModel(employee: Employee): EmployeeModel {
    return new EmployeeModel(
      employee.id,
      employee.username,
      employee.password,
      employee.role as EmployeeRoleModel,
      employee.isActive,
      employee.personId,
    )
  }

  public static toModels(employees: Employee[]): EmployeeModel[] {
    return employees.map((employee) => this.toModel(employee))
  }

  public static dtoToModel(
    dto: CreateEmployeeDto | UpdateEmployeeDto,
  ): EmployeeModel {
    return new EmployeeModel(
      undefined,
      dto.username,
      dto.password,
      dto.role,
      dto.isActive,
      dto.personId,
    )
  }
}
