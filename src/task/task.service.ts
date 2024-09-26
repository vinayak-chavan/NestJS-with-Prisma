import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: CreateTaskDto) {
    const taskData = await this.prisma.task.create({
      data: {
        ...data,
      },
    });
    return {
      message: 'Task created successfully.',
      data: taskData,
    };
  }

  async updateTask(id: string, data: UpdateTaskDto) {
    const existingTask = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException('Task not found.');
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data,
    });

    return {
      message: 'Task updated successfully.',
      data: updatedTask,
    };
  }

  async deleteTask(id: string) {
    await this.prisma.task.delete({
      where: { id },
    });

    return {
      message: 'Task deleted successfully.',
    };
  }

  async listTasks(projectId: string, page: number = 1, limit: number = 10) {
    const skip: number = (page - 1) * limit;

    const totalCount = await this.prisma.task.count({
      where: {
        projectId: projectId,
      },
    });

    const tasks = await this.prisma.task.findMany({
      where: {
        projectId: projectId,
      },
      skip,
      take: Number(limit),
    });

    return {
      message: 'Task list fetched successfully.',
      data: tasks,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async filterTasks(
    status?: TaskStatus,
    assignedUserId?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip: number = (page - 1) * limit;

    const totalCount = await this.prisma.task.count({
      where: {
        ...(status && { status }),
        ...(assignedUserId && { assignedUserId }),
      },
    });

    const tasks = await this.prisma.task.findMany({
      where: {
        ...(status && { status }),
        ...(assignedUserId && { assignedUserId }),
      },
      skip,
      take: Number(limit),
    });

    return {
      message: 'Filtered tasks fetched successfully.',
      data: tasks,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }
}
