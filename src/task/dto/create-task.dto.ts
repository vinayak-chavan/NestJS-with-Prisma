import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { TaskStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Implement Feature X' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Details about the feature implementation.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.TODO })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  assignedUserId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  projectId: string;
}
