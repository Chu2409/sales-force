import { ICreateEmployeeDto } from '../../dtos/create-employee.dto'
import { IEmployeeRes } from '../../dtos/employee.res'
import { IUpdateEmployeeDto } from '../../dtos/update-employee.dto'
import { IAssignPermissionDto } from '../../dtos/assign-permission.dto'
import { IEmployeePermissionsRes } from '../../dtos/employee-permissions.res'

export interface IEmployeesRepositoryPort {
  getEmployees(): Promise<IEmployeeRes[]>
  getEmployeeById(id: number): Promise<IEmployeeRes>
  createEmployee(employee: ICreateEmployeeDto): Promise<IEmployeeRes>
  updateEmployee(
    id: number,
    employee: IUpdateEmployeeDto,
  ): Promise<IEmployeeRes>
  deleteEmployee(id: number): Promise<boolean>
  getPermissionsByEmployeeId(id: number): Promise<IEmployeePermissionsRes>
  assignPermission(id: number, dto: IAssignPermissionDto): Promise<boolean>
}
