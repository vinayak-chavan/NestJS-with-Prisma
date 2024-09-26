// src/app.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { PrismaService } from './prisma/prisma.service';
import { AuthGuard } from './user/auth.guard';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { TasksController } from './task/task.controller';
import { TasksService } from './task/task.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController, ProjectController, TasksController],
  providers: [
    UserService,
    ProjectService,
    TasksService,
    PrismaService,
    AuthGuard,
  ],
})
export class AppModule {}
