import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskI } from './tasks.interfaces';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private tasksRepository: Repository<Task>
  ) {}

  async create(newTask: TaskI): Promise<TaskI> {
      const task = await this.tasksRepository.save(
        this.tasksRepository.create(newTask),
      );

      return this.findOne(task.id);
  }

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  private async findOne(id: number): Promise<TaskI> {
    return this.tasksRepository.findOne({
      where: { id },
    });
  }

  async getOneById(id: number): Promise<TaskI> {
    return this.tasksRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.save({
      id, text: updateTaskDto.text, completed: updateTaskDto.completed
    });
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
