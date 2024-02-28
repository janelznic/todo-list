import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { TaskI } from '../tasks.interfaces';

@Injectable()
export class DtoHelperService {
  createTaskDtoToEntity(createTaskDto: CreateTaskDto): TaskI {
    return {
      text: createTaskDto.text,
      completed: false
    };
  }
}
