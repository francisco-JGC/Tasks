import { Module } from '@nestjs/common';
import { TaskService } from './service/task.service';
import { TaskController } from './controller/task.controller';
import { Task } from 'src/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
