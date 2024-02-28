import { Task } from './task.interface';
import { TodoList } from './todo.class';

export class TodoListUI {
  private todoList: TodoList;
  private elm: { todoList, addItemField, addButton };

  constructor(todoList: TodoList) {
    this.todoList = todoList;

    this.elm = {
      todoList: document.getElementById('todoList')!,
      addItemField: document.getElementById('addItemField') as HTMLInputElement,
      addButton: document.getElementById('addButton')!
    };

    this.buildDOM();
    this.addEventListeners();
  }

  buildDOM() {
    this.elm.todoList.innerHTML = '';

    this.todoList.getTasks().forEach((todo, index) => {
      const newTaskElm = document.createElement('li');
      newTaskElm.innerHTML = `
        <label for="item_${index}" class="item-label">
          <input type="checkbox" ${todo.completed ? "checked" : ""} id="item_${index}">
          <span>${todo.text}</span>
        </label>
        <button class="remove-button" data-id="${todo.id}">Remove</button>
      `;

      this.elm.todoList.appendChild(newTaskElm);
    });
  }

  addEventListeners() {
    this.elm.addButton.addEventListener('click', () => this.addTodo());

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.matches('.remove-button')) {
        const id = parseInt(target.getAttribute('data-id')!);
        this.removeTodoById(id);
      }
    });
  }

  addTodo() {
    const text = this.elm.addItemField.value.trim();

    if (text) {
      const newTodo: Task = {
        id: Date.now(),
        text: text,
        completed: false,
      };

      this.todoList.addTask(newTodo);
      this.buildDOM();
      this.elm.addItemField.value = '';
    }
  }

  removeTodoById(id: number) {
    this.todoList.removeTaskById(id);
    this.buildDOM();
  }
}
