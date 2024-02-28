import { Task } from 'task.interface';

class TodoList {
  private tasks: Task[] = [];

  addTask(task: Task) {
    this.tasks.push(task);
  }

  removeTaskById(id: number) {
    this.tasks = this.tasks.filter((todo) => todo.id !== id);
  }

  getTask(): Task[] {
    return this.tasks;
  }
}
