import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ITasksRepositoryPort } from 'src/tasks/domain/ports/out/tasks.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { ITaskRes } from 'src/tasks/domain/dtos/task.res'
import { ICreateTaskDto } from 'src/tasks/domain/dtos/create-task.dto'
import { IUpdateTaskDto } from 'src/tasks/domain/dtos/update-task.dto'
import { TasksMapper } from './tasks.mapper'

@Injectable()
export class TasksPrismaRepositoryAdapter implements ITasksRepositoryPort {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async createTask(task: ICreateTaskDto): Promise<ITaskRes> {
    const createdTask = await this.prismaService.task.create({
      data: task,
      include: {
        delegation: {
          include: {
            consumer: { include: { person: { include: { location: true } } } },
            employee: { include: { person: { include: { location: true } } } },
          },
        },
        comments: true,
      },
    })

    return createdTask ? TasksMapper.toRes(createdTask) : null
  }

  async updateTask(id: number, task: IUpdateTaskDto): Promise<ITaskRes> {
    const updatedTask = await this.prismaService.task.update({
      where: { id },
      data: task,
      include: {
        delegation: {
          include: {
            consumer: { include: { person: { include: { location: true } } } },
            employee: { include: { person: { include: { location: true } } } },
          },
        },
        comments: true,
      },
    })

    return updatedTask ? TasksMapper.toRes(updatedTask) : null
  }

  async deleteTask(id: number): Promise<boolean> {
    const transactionExists = await this.prismaService.transaction.findMany({
      where: { taskId: id },
    })
    if (transactionExists.length > 0) return false

    const deletedTask = await this.prismaService.task.delete({
      where: { id },
    })

    return !!deletedTask
  }

  async getTasks(): Promise<ITaskRes[]> {
    const tasks = await this.prismaService.task.findMany({
      include: {
        delegation: {
          include: {
            consumer: { include: { person: { include: { location: true } } } },
            employee: { include: { person: { include: { location: true } } } },
          },
        },
        comments: true,
      },
    })

    return tasks.map((task) => TasksMapper.toRes(task))
  }

  async getTaskById(id: number): Promise<ITaskRes> {
    const task = await this.prismaService.task.findUnique({
      where: { id },
      include: {
        delegation: {
          include: {
            consumer: { include: { person: { include: { location: true } } } },
            employee: { include: { person: { include: { location: true } } } },
          },
        },
        comments: true,
      },
    })

    return task ? TasksMapper.toRes(task) : null
  }

  async getTasksByEmployeeId(employeeId: number): Promise<ITaskRes[]> {
    const tasks = await this.prismaService.task.findMany({
      where: { delegation: { employeeId } },
      include: {
        delegation: {
          include: {
            consumer: { include: { person: { include: { location: true } } } },
            employee: { include: { person: { include: { location: true } } } },
          },
        },
        comments: true,
      },
    })

    return tasks.map((task) => TasksMapper.toRes(task))
  }

  async getTasksByConsumerId(consumerId: number): Promise<ITaskRes[]> {
    const tasks = await this.prismaService.task.findMany({
      where: { delegation: { consumerId } },
      include: {
        delegation: {
          include: {
            consumer: { include: { person: { include: { location: true } } } },
            employee: { include: { person: { include: { location: true } } } },
          },
        },
        comments: true,
      },
    })

    return tasks.map((task) => TasksMapper.toRes(task))
  }

  async addComment(taskId: number, comment: string): Promise<ITaskRes> {
    const createdComment = await this.prismaService.comment.create({
      data: {
        taskId,
        content: comment,
      },
      include: {
        task: {
          include: {
            delegation: {
              include: {
                consumer: {
                  include: { person: { include: { location: true } } },
                },
                employee: {
                  include: { person: { include: { location: true } } },
                },
              },
            },
            comments: true,
          },
        },
      },
    })

    return createdComment ? TasksMapper.toRes(createdComment.task) : null
  }

  async getTasksByEmployeeIdAndDate(
    employeeId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<ITaskRes[]> {
    const tasks = await this.prismaService.task.findMany({
      where: {
        delegation: { employeeId },
        date: {
          gte: startDate,
          lte: endDate,
        },
        status: null,
      },
      include: {
        delegation: {
          include: {
            consumer: { include: { person: { include: { location: true } } } },
            employee: { include: { person: { include: { location: true } } } },
          },
        },
        comments: true,
      },
    })

    return tasks.map((task) => TasksMapper.toRes(task))
  }
}
