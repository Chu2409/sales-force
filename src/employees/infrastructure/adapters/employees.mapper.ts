import { Employee, Module, Permission } from '@prisma/client'
import { IEmployeePermissionsRes } from 'src/employees/domain/dtos/employee-permissions.res'
import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import {
  IPrismaPersonWithLocation,
  PeopleMapper,
} from 'src/people/infrastructure/adapters/people.mapper'

interface IPrismaFullEmployee extends Employee {
  person: IPrismaPersonWithLocation
}

interface IPrismaPermissionWithModule extends Permission {
  module: Module
}

interface IFullEmployeePrismaWithPermissions extends IPrismaFullEmployee {
  permissions: IPrismaPermissionWithModule[]
}

export class EmployeesMapper {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static toRes({ personId, ...employee }: IPrismaFullEmployee): IEmployeeRes {
    return {
      ...employee,
      role: employee.role as EmployeeRole,
      person: PeopleMapper.toResWithLocation(employee.person),
    }
  }

  static toResWithPermissions({
    permissions,
    ...employee
  }: IFullEmployeePrismaWithPermissions): IEmployeePermissionsRes {
    return {
      ...this.toRes(employee),
      modules: permissions.map((permission) => permission.module),
    }
  }
}
