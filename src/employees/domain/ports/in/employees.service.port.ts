import { IAssignPermissionDto } from '../../dtos/assign-permission.dto'
import { ICreateEmployeeDto } from '../../dtos/create-employee.dto'
import { IEmployeeRes } from '../../dtos/employee.res'
import { IUpdateEmployeeDto } from '../../dtos/update-employee.dto'
import { IModuleRes } from 'src/modules/domain/dtos/module.res'

export interface IEmployeesServicePort {
  getEmployees(): Promise<IEmployeeRes[]>
  getEmployeeById(id: number): Promise<IEmployeeRes>
  createEmployee(employee: ICreateEmployeeDto): Promise<IEmployeeRes>
  updateEmployee(
    id: number,
    employee: IUpdateEmployeeDto,
  ): Promise<IEmployeeRes>
  deleteEmployee(id: number): Promise<boolean>
  getPermissionsByEmployeeId(id: number): Promise<IModuleRes[]>
  assignPermission(id: number, dto: IAssignPermissionDto): Promise<boolean>
}
