import { Task } from './task.interface';

export class TodoList {
  private tasks: Task[] = [];

  constructor(tasks: Task[]) {
    this.tasks = tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  removeTaskById(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getTasks(): Task[] {
    return this.tasks;
  }
}
