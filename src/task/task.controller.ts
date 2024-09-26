import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '../user/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('create')
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('update/:id')
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Task updated successfully.' })
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  @ApiResponse({ status: 200, description: 'Task deleted successfully.' })
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('list/:id')
  @ApiResponse({ status: 200, description: 'Task list fetched successfully.' })
  async listTasks(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tasksService.listTasks(id, page, limit);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Filtered tasks fetched successfully.',
  })
  async filterTasks(
    @Query('status') status?: TaskStatus,
    @Query('assignedUserId') assignedUserId?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tasksService.filterTasks(status, assignedUserId, page, limit);
  }
}
