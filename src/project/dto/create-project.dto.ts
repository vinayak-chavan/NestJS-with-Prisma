import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty from swagger
import { ProjectStatus } from '@prisma/client';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'New Website',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'A brief description of the project',
    example: 'A project to develop a new company website.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The current status of the project',
    enum: ProjectStatus,
    example: ProjectStatus.PLANNED,
  })
  @IsEnum(ProjectStatus)
  status: ProjectStatus;
}
