import { IPersonModel } from 'src/people/domain/models/person.model'
import { EmployeeRole, IEmployee } from './models/employee.interface'

export class Employee implements IEmployee {
  id: number
  username: string
  password: string
  role: EmployeeRole
  isActive: boolean
  person: IPersonModel

  constructor() {}

  static builder() {
    return new EmployeeBuilder(new Employee())
  }
}

class EmployeeBuilder {
  constructor(private employee: IEmployee) {}

  id(id: number) {
    this.employee.id = id
    return this
  }

  username(username: string) {
    this.employee.username = username
    return this
  }

  password(password: string) {
    this.employee.password = password
    return this
  }

  role(role: EmployeeRole) {
    this.employee.role = role
    return this
  }

  isActive(isActive: boolean) {
    this.employee.isActive = isActive
    return this
  }

  person(person: IPersonModel) {
    this.employee.person = person
    return this
  }

  build() {
    return this.employee
  }
}
