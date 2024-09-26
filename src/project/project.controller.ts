import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '../user/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({ status: 201, description: 'Project created successfully.' })
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.projectService.createProject(createProjectDto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({ status: 200, description: 'Project updated successfully.' })
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.projectService.updateProject(id, updateProjectDto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Project deleted successfully.' })
  async deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Projects fetched successfully.' })
  async listProjects(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.projectService.listProjects(page, limit);
  }
}
