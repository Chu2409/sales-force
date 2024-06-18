import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateTaskReq } from '../models/create-task.req'
import { UpdateTaskReq } from '../models/update-task.req'
import { TasksService } from 'src/tasks/application/tasks.service'
import { TASKS_SERVICE_PORT } from 'src/tasks/shared/tasks.consts'

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TASKS_SERVICE_PORT)
    private readonly tasksService: TasksService,
  ) {}

  @Get()
  async getTasks() {
    return await this.tasksService.getTasks()
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.getTaskById(id)
  }

  @Get('consumer/:id')
  async getTasksByConsumerId(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.getTasksByConsumerId(id)
  }

  @Get('employee/:id')
  async getTasksByEmployeeId(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.getTasksByEmployeeId(id)
  }

  @Post()
  async createTask(@Body() task: CreateTaskReq) {
    return await this.tasksService.createTask(task)
  }

  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskReq,
  ) {
    return await this.tasksService.updateTask(id, task)
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.deleteTask(id)
  }

  @Post(':id/comment')
  async addComment(
    @Param('id', ParseIntPipe) id: number,
    @Body('comment') comment: string,
  ) {
    return await this.tasksService.addComment(id, comment)
  }
}
