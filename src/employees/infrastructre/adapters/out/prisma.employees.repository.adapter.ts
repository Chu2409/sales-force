import { Inject, Injectable } from '@nestjs/common'
import { EmployeeModel } from 'src/employees/domain/models/employee'
import { IEmployeesRepositoryPort } from 'src/employees/domain/ports/out/employees.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { EmployeesMapper } from '../mappers/employees.mapper'

@Injectable()
export class PrismaEmployeeRepositoryAdapter
  implements IEmployeesRepositoryPort
{
  constructor(
    @Inject('PrismaService') private readonly prismaService: PrismaService,
  ) {}

  async getEmployees(): Promise<EmployeeModel[]> {
    return EmployeesMapper.toModels(
      await this.prismaService.employee.findMany(),
    )
  }

  async getEmployeeById(id: number): Promise<EmployeeModel> {
    return EmployeesMapper.toModel(
      await this.prismaService.employee.findUnique({
        where: { id },
      }),
    )
  }

  async createEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
    return EmployeesMapper.toModel(
      await this.prismaService.employee.create({
        data: {
          username: employee.getUsername(),
          password: employee.getPassword(),
          role: employee.getRole(),
          isActive: employee.getIsActive(),
          personId: employee.getPersonId(),
        },
      }),
    )
  }

  async updateEmployee(
    id: number,
    employee: EmployeeModel,
  ): Promise<EmployeeModel> {
    return EmployeesMapper.toModel(
      await this.prismaService.employee.update({
        where: { id },
        data: {
          username: employee.getUsername(),
          password: employee.getPassword(),
          role: employee.getRole(),
          isActive: employee.getIsActive(),
          personId: employee.getPersonId(),
        },
      }),
    )
  }

  async deleteEmployee(id: number): Promise<boolean> {
    const employee = await this.prismaService.employee.update({
      where: { id },
      data: { isActive: false },
    })
    return !!employee
  }
}
