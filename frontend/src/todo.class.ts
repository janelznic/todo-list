import { Task } from './task.interface';

export class TodoList {
  private tasks: Task[] = [];
  private backendUrl: string;

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async addTask(task: Task) {
    const res = await fetch(`${this.backendUrl}/tasks/`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" }
    });
    console.log(res.json());
    return res;
  }

  async updateTaskById(id: number, task) {
    return await fetch(`${this.backendUrl}/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" }
    });
  }

  async removeTaskById(id: number) {
    return await fetch(`${this.backendUrl}/tasks/${id}`, { method: 'DELETE' });
  }

  async getTaskById(id: number) {
    const res = await fetch(`${this.backendUrl}/tasks/id/${id}`);
    return await res.json();
  }

  async getTasks(): Promise<Task[]> {
    const res = await fetch(`${this.backendUrl}/tasks/`);
    return this.tasks = await res.json();
  }
}
