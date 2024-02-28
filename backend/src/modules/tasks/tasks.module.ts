import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { taskProviders } from './tasks.providers';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DtoHelperService } from './dto/dto-helper.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [...taskProviders, TasksService, DtoHelperService],
  exports: [TasksService]
})
export class TasksModule {}
