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
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'
import { Auth } from 'src/auth/infrastructure/http-server/decorators/auth.decorator'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TaskRes } from '../models/task.res'

@Controller('tasks')
@Auth(EmployeeRole.SUPERVISOR, EmployeeRole.ADMIN)
@ApiTags('Tasks')
export class TasksController {
  constructor(
    @Inject(TASKS_SERVICE_PORT)
    private readonly tasksService: TasksService,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, isArray: true, type: TaskRes })
  async getTasks() {
    return await this.tasksService.getTasks()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({ status: 200, type: TaskRes })
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.getTaskById(id)
  }

  @Get('consumer/:id')
  @ApiOperation({ summary: 'Get tasks by consumer id' })
  @ApiResponse({ status: 200, isArray: true, type: TaskRes })
  async getTasksByConsumerId(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.getTasksByConsumerId(id)
  }

  @Get('employee/:id')
  @ApiOperation({ summary: 'Get tasks by employee id' })
  @ApiResponse({ status: 200, isArray: true, type: TaskRes })
  async getTasksByEmployeeId(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.getTasksByEmployeeId(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 200, type: TaskRes })
  async createTask(@Body() task: CreateTaskReq) {
    return await this.tasksService.createTask(task)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({ status: 200, type: TaskRes })
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskReq,
  ) {
    return await this.tasksService.updateTask(id, task)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({ status: 200, type: Boolean })
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.deleteTask(id)
  }

  @Post(':id/comment')
  @ApiOperation({ summary: 'Add comment to task' })
  @ApiResponse({ status: 200, type: TaskRes })
  async addComment(
    @Param('id', ParseIntPipe) id: number,
    @Body('comment') comment: string,
  ) {
    return await this.tasksService.addComment(id, comment)
  }
}
