import { Task } from './task.interface';
import { TodoList } from './todo.class';

export class TodoListUI {
  private todoList: TodoList;
  private editableTask: Task;
  private elm: { addForm, addItemField, addButton, editForm, editItemField, saveButton, cancelButton, todoList };

  constructor(todoList: TodoList) {
    this.todoList = todoList;

    this.elm = {
      todoList: document.getElementById('todoList')!,
      editForm: document.getElementById('editForm')!,
      editItemField: document.getElementById('editItemField') as HTMLInputElement,
      saveButton: document.getElementById('saveButton')!,
      cancelButton: document.getElementById('cancelButton')!,
      addForm: document.getElementById('addForm')!,
      addItemField: document.getElementById('addItemField') as HTMLInputElement,
      addButton: document.getElementById('addButton')!
    };

    this.addEventListeners();
  }

  addEventListeners() {
    this.elm.addButton.addEventListener('click', () => this.addTask());
    this.elm.saveButton.addEventListener('click', () => this.saveTask());
    this.elm.cancelButton.addEventListener('click', () => this.swhitchToAddForm());

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const id = parseInt(target.getAttribute('data-id')!);

      if (target.matches('.remove-button')) {
        this.removeTaskById(id);
      }
      if (target.matches('.update-button')) {
        this.updateTaskById(id);
      }
      if (target.matches('.check-button')) {
        this.checkTaskById(id);
      }
    });

    window.addEventListener('load', () => {
      this.buildDOM();
    });
  }

  async buildDOM() {
    const tasks = await this.todoList.getTasks();
    this.elm.todoList.innerHTML = '';
    tasks.forEach((todo, index) => {
      const newTaskElm = document.createElement('li');
      newTaskElm.innerHTML = `
        <label for="item_${index}" class="item-label check-button" data-id="${todo.id}">
          <input type="checkbox" ${todo.completed ? "checked" : ""} id="item_${index}">
          <span>${todo.text}</span>
        </label>
        <button class="update-button" data-id="${todo.id}">Update</button>
        <button class="remove-button" data-id="${todo.id}">Remove</button>
      `;

      this.elm.todoList.appendChild(newTaskElm);
    });
  }

  addTask() {
    const text = this.elm.addItemField.value.trim();

    if (text) {
      const newTodo: Task = {
        text: text,
        completed: false,
      };

      this.todoList.addTask(newTodo);
      this.buildDOM();
      this.elm.addItemField.value = '';
    }
  }

  async removeTaskById(id: number) {
    await this.todoList.removeTaskById(id);
    this.buildDOM();
  }

  async checkTaskById(id: number) {
    let task = await this.todoList.getTaskById(id);
    task.completed = !task.completed;
    await this.todoList.updateTaskById(id, task);
    this.buildDOM();
  }

  async updateTaskById(id: number) {
    this.editableTask = await this.todoList.getTaskById(id);
    this.elm.editItemField.value = this.editableTask.text;
    this.switchToEditForm();
  }

  async saveTask() {
    await this.todoList.updateTaskById(this.editableTask.id, {
      text: this.elm.editItemField.value,
      completed: this.editableTask.completed
    });
    this.buildDOM();
    this.swhitchToAddForm();
  }

  switchToEditForm() {
    this.elm.addForm.style.display = 'none';
    this.elm.editForm.style.display = 'block';
  }

  swhitchToAddForm() {
    this.editableTask = null;
    this.elm.editItemField.value = '';
    this.elm.addForm.style.display = 'block';
    this.elm.editForm.style.display = 'none';
  }
}
