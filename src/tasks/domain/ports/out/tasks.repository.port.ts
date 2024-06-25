import { ITaskRes } from '../../dtos/task.res'
import { ICreateTaskDto } from '../../dtos/create-task.dto'
import { IUpdateTaskDto } from '../../dtos/update-task.dto'

export interface ITasksRepositoryPort {
  createTask(task: ICreateTaskDto): Promise<ITaskRes>
  updateTask(id: number, task: IUpdateTaskDto): Promise<ITaskRes>
  deleteTask(id: number): Promise<boolean>
  getTasks(): Promise<ITaskRes[]>
  getTaskById(id: number): Promise<ITaskRes>
  getTasksByEmployeeId(employeeId: number): Promise<ITaskRes[]>
  getTasksByConsumerId(consumerId: number): Promise<ITaskRes[]>
  addComment(taskId: number, comment: string): Promise<ITaskRes>
  getTasksByEmployeeIdAndDate(
    employeeId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<ITaskRes[]>
}
