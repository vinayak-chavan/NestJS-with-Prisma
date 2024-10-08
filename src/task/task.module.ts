import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
})
export class TaskModule {}
