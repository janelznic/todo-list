import { Task } from './task.interface';
import { TodoList } from './todo.class';

enum EditMode { Add, Edit };

export class TodoListUI {
  private todoListObj: TodoList;
  private editableTask: Task;
  private elm: { addForm, addItemField, addButton, editForm, editItemField, saveButton, cancelButton, todoList };
  private editMode: EditMode;

  constructor(todoList: TodoList) {
    this.todoListObj = todoList;

    this.editMode = EditMode.Add;

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

    window.addEventListener('keydown', (event) => this.keyDownHandler(event));
  }

  async buildDOM() {
    const tasks = await this.todoListObj.getTasks();
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

      this.todoListObj.addTask(newTodo);
      this.buildDOM();
      this.elm.addItemField.value = '';
    }
  }

  async removeTaskById(id: number) {
    await this.todoListObj.removeTaskById(id);
    this.buildDOM();
  }

  async checkTaskById(id: number) {
    let task = await this.todoListObj.getTaskById(id);
    task.completed = !task.completed;
    await this.todoListObj.updateTaskById(id, task);
    this.buildDOM();
  }

  async updateTaskById(id: number) {
    this.editableTask = await this.todoListObj.getTaskById(id);
    this.elm.editItemField.value = this.editableTask.text;
    this.switchToEditForm();
  }

  async saveTask() {
    await this.todoListObj.updateTaskById(this.editableTask.id, {
      text: this.elm.editItemField.value,
      completed: this.editableTask.completed
    });
    this.buildDOM();
    this.swhitchToAddForm();
  }

  keyDownHandler(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.editMode === EditMode.Add && this.elm.addItemField !== '') {
        this.addTask();
      } else if (this.editMode === EditMode.Edit && this.elm.editItemField !== '') {
        this.saveTask();
      }
    }
  }

  switchToEditForm() {
    this.editMode = EditMode.Edit;

    this.elm.addForm.style.display = 'none';
    this.elm.editForm.style.display = 'block';
  }

  swhitchToAddForm() {
    this.editMode = EditMode.Add;

    this.editableTask = null;
    this.elm.editItemField.value = '';
    this.elm.addForm.style.display = 'block';
    this.elm.editForm.style.display = 'none';
  }
}
