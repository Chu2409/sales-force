/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common'
import { IEmployeesRepositoryPort } from 'src/employees/domain/ports/out/employees.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'
import { ICreateEmployeeDto } from 'src/employees/domain/dtos/create-employee.dto'
import { IUpdateEmployeeDto } from 'src/employees/domain/dtos/update-employee.dto'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { EmployeeRole } from 'src/employees/domain/models/employee.model'
import { PersonGender } from 'src/people/domain/models/person.model'
import { LocationType } from 'src/locations/domain/models/location.model'

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

    return employees.map(({ personId, ...employee }) => {
      const { locationId, ...person } = employee.person
      const { parentId, ...location } = person.location

      return {
        ...employee,
        role: employee.role as EmployeeRole,
        person: {
          ...person,
          gender: employee.person.gender as PersonGender,
          location: {
            ...location,
            type: location.type as LocationType,
          },
        },
      }
    })
  }

  async getEmployeeById(id: number): Promise<IEmployeeRes> {
    const { personId, ...employee } =
      await this.prismaService.employee.findUnique({
        where: { id },
        include: {
          person: {
            include: { location: true },
          },
        },
      })

    const { locationId, ...person } = employee.person
    const { parentId, ...location } = person.location

    return {
      ...employee,
      role: employee.role as EmployeeRole,
      person: {
        ...person,
        gender: employee.person.gender as PersonGender,
        location: {
          ...location,
          type: location.type as LocationType,
        },
      },
    }
  }

  async createEmployee({
    person: personToCreate,
    ...employeeToCreate
  }: ICreateEmployeeDto): Promise<IEmployeeRes> {
    const { personId, ...employee } = await this.prismaService.employee.create({
      data: {
        ...employeeToCreate,
        person: {
          create: {
            ...personToCreate,
          },
        },
      },
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    const { locationId, ...person } = employee.person
    const { parentId, ...location } = person.location

    return {
      ...employee,
      role: employee.role as EmployeeRole,
      person: {
        ...person,
        gender: employee.person.gender as PersonGender,
        location: {
          ...location,
          type: location.type as LocationType,
        },
      },
    }
  }

  async updateEmployee(
    id: number,
    { person: personToUpdate, ...employeeToUpdate }: IUpdateEmployeeDto,
  ): Promise<IEmployeeRes> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { personId, ...employee } = await this.prismaService.employee.update({
      where: { id },
      data: {
        ...employeeToUpdate,
        person: {
          update: {
            data: {
              ...personToUpdate,
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

    const { locationId, ...person } = employee.person
    const { parentId, ...location } = person.location

    return {
      ...employee,
      role: employee.role as EmployeeRole,
      person: {
        ...person,
        gender: employee.person.gender as PersonGender,
        location: {
          ...location,
          type: location.type as LocationType,
        },
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
