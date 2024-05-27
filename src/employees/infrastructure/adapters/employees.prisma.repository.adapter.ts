import { Inject, Injectable } from '@nestjs/common'
import { IEmployeesRepositoryPort } from 'src/employees/domain/ports/out/employees.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'
import { ICreateEmployeeDto } from 'src/employees/domain/dtos/create-employee.dto'
import { IUpdateEmployeeDto } from 'src/employees/domain/dtos/update-employee.dto'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { EmployeeRole } from 'src/employees/domain/models/employee.model'
import { PersonGender } from 'src/people/domain/models/person.model'

@Injectable()
export class EmployeesPrismaRepositoryAdapter
  implements IEmployeesRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getEmployees(): Promise<IEmployeeRes[]> {
    const employees = await this.prismaService.employee.findMany({
      include: { person: true },
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return employees.map(({ personId, ...employee }) => ({
      ...employee,
      role: employee.role as EmployeeRole,
      person: {
        ...employee.person,
        gender: employee.person.gender as PersonGender,
      },
    }))
  }

  async getEmployeeById(id: number): Promise<IEmployeeRes> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { personId, ...employee } =
      await this.prismaService.employee.findUnique({
        where: { id },
        include: { person: true },
      })

    return {
      ...employee,
      role: employee.role as EmployeeRole,
      person: {
        ...employee.person,
        gender: employee.person.gender as PersonGender,
      },
    }
  }

  async createEmployee({
    person,
    ...employee
  }: ICreateEmployeeDto): Promise<IEmployeeRes> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { personId, ...employeeCreated } =
      await this.prismaService.employee.create({
        data: {
          ...employee,
          person: {
            create: {
              ...person,
            },
          },
        },
        include: { person: true },
      })

    return {
      ...employeeCreated,
      role: employeeCreated.role as EmployeeRole,
      person: {
        ...employeeCreated.person,
        gender: employeeCreated.person.gender as PersonGender,
      },
    }
  }

  async updateEmployee(
    id: number,
    { person, ...employee }: IUpdateEmployeeDto,
  ): Promise<IEmployeeRes> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { personId, ...employeeUpdated } =
      await this.prismaService.employee.update({
        where: { id },
        data: {
          ...employee,
          person: {
            update: {
              data: {
                ...person,
              },
            },
          },
        },
        include: { person: true },
      })

    return {
      ...employeeUpdated,
      role: employeeUpdated.role as EmployeeRole,
      person: {
        ...employeeUpdated.person,
        gender: employeeUpdated.person.gender as PersonGender,
      },
    }
  }

  async deleteEmployee(id: number): Promise<boolean> {
    const employee = await this.prismaService.employee.update({
      where: { id },
      data: { isActive: false },
    })
    return !!employee
  }
}
