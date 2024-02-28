import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException, ConflictException } from '@nestjs/common';
import { ApiExtension, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DtoHelperService } from './dto/dto-helper.service';
import { Task } from './entities/task.entity';
import { TaskI } from './tasks.interfaces';

const errorNotFound = (error, str) => {
  throw new HttpException({
    statusCode: HttpStatus.NOT_FOUND,
    message: `Task ${str} not found`,
  }, HttpStatus.NOT_FOUND, {
    cause: error
  });
}

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private dtoHelperService: DtoHelperService,
  ) {}

  @ApiOperation({ summary: 'Create a task' })
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskI> {
    const taskEntity: TaskI = await this.dtoHelperService.createTaskDtoToEntity(
      createTaskDto,
    );
    return this.tasksService.create(taskEntity);
  }

  @ApiOperation({ summary: 'List all tasks' })
  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @ApiOperation({ summary: 'Get task by Id' })
  @Get('/id/:id')
  async findById(@Param('id') id: string) {
    try {
      const task: TaskI = await this.tasksService.getOneById(+id);
      if (!task) throw new NotFoundException();
      return task;
    } catch (error) { 
      errorNotFound(error, id);
    }
  }

  @ApiOperation({ summary: 'Update task by Id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Delete task by Id' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const task: TaskI = await this.tasksService.getOneById(+id);
      if (task) {
        await this.tasksService.remove(+id);
        return {
          statusCode: HttpStatus.OK,
          message: `Task ${task.text} successfully removed.`
        }
      }
      throw new NotFoundException();
    } catch (error) { 
      errorNotFound(error, id);
    }
  }
}
