import { Inject, Injectable } from '@nestjs/common'
import { ITasksServicePort } from '../domain/ports/in/tasks.service.port'
import { ITasksRepositoryPort } from '../domain/ports/out/tasks.repository.port'
import { ICreateTaskDto } from '../domain/dtos/create-task.dto'
import { IUpdateTaskDto } from '../domain/dtos/update-task.dto'
import { ITaskRes } from '../domain/dtos/task.res'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'
import { TASKS_REPOSITORY_PORT } from '../shared/tasks.consts'
import { DELEGATIONS_SERVICE_PORT } from 'src/delegations/shared/delegations.consts'
import { IDelegationsServicePort } from 'src/delegations/domain/ports/in/delegations.service.port'
import { EMPLOYEES_SERVICE_PORT } from 'src/employees/shared/employees.consts'
import { IEmployeesServicePort } from 'src/employees/domain/ports/in/employees.service.port'
import { CONSUMERS_SERVICE_PORT } from 'src/consumers/shared/consumers.consts'
import { IConsumersServicePort } from 'src/consumers/domain/ports/in/consumers.service.port'

@Injectable()
export class TasksService implements ITasksServicePort {
  constructor(
    @Inject(TASKS_REPOSITORY_PORT)
    private readonly repository: ITasksRepositoryPort,
    @Inject(DELEGATIONS_SERVICE_PORT)
    private readonly delegationsService: IDelegationsServicePort,
    @Inject(EMPLOYEES_SERVICE_PORT)
    private readonly employeesService: IEmployeesServicePort,
    @Inject(CONSUMERS_SERVICE_PORT)
    private readonly consumersService: IConsumersServicePort,
  ) {}

  async createTask(task: ICreateTaskDto): Promise<ITaskRes> {
    await this.delegationsService.getDelegationById(task.delegationId)

    const createdTask = await this.repository.createTask(task)
    if (!createdTask)
      throw new AppError('Task not created', Errors.INTERNAL_SERVER_ERROR)

    return createdTask
  }

  async updateTask(id: number, task: IUpdateTaskDto): Promise<ITaskRes> {
    await this.getTaskById(id)

    const updatedTask = await this.repository.updateTask(id, task)
    if (!updatedTask)
      throw new AppError('Task not updated', Errors.INTERNAL_SERVER_ERROR)

    return updatedTask
  }

  async deleteTask(id: number): Promise<boolean> {
    await this.getTaskById(id)

    const deletedTask = await this.repository.deleteTask(id)
    if (!deletedTask)
      throw new AppError('Task not deleted', Errors.INTERNAL_SERVER_ERROR)

    return deletedTask
  }

  async getTasks(): Promise<ITaskRes[]> {
    return this.repository.getTasks()
  }

  async getTaskById(id: number): Promise<ITaskRes> {
    const task = await this.repository.getTaskById(id)
    if (!task) throw new AppError('Task not found', Errors.NOT_FOUND)

    return task
  }

  async getTasksByConsumerId(consumerId: number): Promise<ITaskRes[]> {
    await this.consumersService.getConsumerById(consumerId)

    return this.repository.getTasksByConsumerId(consumerId)
  }

  async getTasksByEmployeeId(employeeId: number): Promise<ITaskRes[]> {
    await this.employeesService.getEmployeeById(employeeId)

    return this.repository.getTasksByEmployeeId(employeeId)
  }

  async addComment(taskId: number, comment: string): Promise<ITaskRes> {
    if (!comment) throw new AppError('Comment is required', Errors.BAD_REQUEST)

    await this.getTaskById(taskId)

    const updatedTask = await this.repository.addComment(taskId, comment)
    if (!updatedTask)
      throw new AppError('Comment not added', Errors.INTERNAL_SERVER_ERROR)

    return updatedTask
  }
}
