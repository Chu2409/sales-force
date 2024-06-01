import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IEmployeesRepositoryPort } from 'src/employees/domain/ports/out/employees.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'
import { ICreateEmployeeDto } from 'src/employees/domain/dtos/create-employee.dto'
import { IUpdateEmployeeDto } from 'src/employees/domain/dtos/update-employee.dto'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { EmployeesMapper } from './employees.mapper'

@Injectable()
export class EmployeesPrismaRepositoryAdapter
  implements IEmployeesRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getEmployees(): Promise<IEmployeeRes[]> {
    const employees = await this.prismaService.employee.findMany({
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    return employees.map((employee) => EmployeesMapper.toRes(employee))
  }

  async getEmployeeById(id: number): Promise<IEmployeeRes> {
    const employee = await this.prismaService.employee.findUnique({
      where: { id },
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    if (!employee) throw new NotFoundException('Employee not found')

    return EmployeesMapper.toRes(employee)
  }

  async createEmployee(employee: ICreateEmployeeDto): Promise<IEmployeeRes> {
    const createdEmployee = await this.prismaService.employee.create({
      data: {
        ...employee,
        person: {
          create: {
            ...employee.person,
          },
        },
      },
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    return EmployeesMapper.toRes(createdEmployee)
  }

  async updateEmployee(
    id: number,
    employee: IUpdateEmployeeDto,
  ): Promise<IEmployeeRes> {
    await this.getEmployeeById(id)

    const updatedEmployee = await this.prismaService.employee.update({
      where: { id },
      data: {
        ...employee,
        person: {
          update: {
            data: {
              ...employee.person,
            },
          },
        },
      },
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    return EmployeesMapper.toRes(updatedEmployee)
  }

  async deleteEmployee(id: number): Promise<boolean> {
    await this.getEmployeeById(id)

    const employee = await this.prismaService.employee.update({
      where: { id },
      data: { isActive: false },
    })
    return !!employee
  }
}
