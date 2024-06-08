import { ICreateEmployeeDto } from '../../dtos/create-employee.dto'
import { IEmployeeRes } from '../../dtos/employee.res'
import { IUpdateEmployeeDto } from '../../dtos/update-employee.dto'
import { IAssignPermissionDto } from '../../dtos/assign-permission.dto'
import { IModuleRes } from 'src/modules/domain/dtos/module.res'

export interface IEmployeesRepositoryPort {
  getEmployees(): Promise<IEmployeeRes[]>
  getEmployeeById(id: number): Promise<IEmployeeRes>
  createEmployee(employee: ICreateEmployeeDto): Promise<IEmployeeRes>
  updateEmployee(
    id: number,
    employee: IUpdateEmployeeDto,
  ): Promise<IEmployeeRes>
  setEmployeeActive(id: number, state: boolean): Promise<boolean>
  checkPermissionExists(employeeId: number, moduleId: number): Promise<boolean>
  getPermissionsByEmployeeId(id: number): Promise<IModuleRes[]>
  assignPermission(id: number, dto: IAssignPermissionDto): Promise<boolean>
  encryptPassword(password: string): string
}
