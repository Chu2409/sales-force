import { ICreateTaskDto } from '../../dtos/create-task.dto'
import { IUpdateTaskDto } from '../../dtos/update-task.dto'
import { ITaskRes } from '../../dtos/task.res'

export interface ITasksServicePort {
  createTask(task: ICreateTaskDto): Promise<ITaskRes>
  updateTask(id: number, task: IUpdateTaskDto): Promise<ITaskRes>
  deleteTask(id: number): Promise<boolean>
  getTasks(): Promise<ITaskRes[]>
  getTaskById(id: number): Promise<ITaskRes>
  getTasksByEmployeeId(employeeId: number): Promise<ITaskRes[]>
  getTasksByConsumerId(consumerId: number): Promise<ITaskRes[]>
  addComment(taskId: number, comment: string): Promise<ITaskRes>
  checkEmployeeAvailability(employeeId: number, date: Date): Promise<boolean>
}
