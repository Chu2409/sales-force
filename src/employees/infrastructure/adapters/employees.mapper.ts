/* eslint-disable @typescript-eslint/no-unused-vars */
import { Employee, Location, Person } from '@prisma/client'
import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { LocationType } from 'src/locations/domain/models/location.interface'
import { PersonGender } from 'src/people/domain/models/person.interface'

interface IFullEmployeePrisma extends Employee {
  person: Person & { location: Location }
}

export class EmployeesMapper {
  static toRes({ personId, ...employee }: IFullEmployeePrisma): IEmployeeRes {
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
}
