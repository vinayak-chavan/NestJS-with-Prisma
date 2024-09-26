import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { Prisma } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createProject(data: CreateProjectDto, userId: string) {
    const projectData = await this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        status: data.status,
        userId: userId, // Set userId here
      },
    });
    return {
      message: 'Project created successfully.',
      data: projectData,
    };
  }

  async updateProject(id: string, data: UpdateProjectDto, userId: string) {
    const existingProject = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      throw new NotFoundException('Project not found.');
    }

    const updatedProject = await this.prisma.project.update({
      where: { id },
      data: {
        ...data,
        userId: userId,
      },
    });

    return {
      message: 'Project updated successfully.',
      data: updatedProject,
    };
  }

  async deleteProject(id: string) {
    await this.prisma.project.delete({ where: { id } });
    return {
      message: 'Project deleted successfully.',
    };
  }

  async listProjects(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const projectList = await this.prisma.project.findMany({
      skip,
      take: Number(limit),
    });

    const totalCount = await this.prisma.project.count();

    return {
      message: 'Projects fetched successfully.',
      data: projectList,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }
}
