document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todoInput');
  const addBtn = document.getElementById('addBtn');
  const todoList = document.getElementById('todoList');

  // Load todos from server
  loadTodos();

  addBtn.addEventListener('click', addTodo);
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  function loadTodos() {
    fetch('/api/todos')
      .then(response => response.json())
      .then(todos => {
        todoList.innerHTML = '';
        todos.forEach(todo => {
          renderTodo(todo);
        });
      });
  }

  function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
      fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
      .then(response => response.json())
      .then(todo => {
        renderTodo(todo);
        todoInput.value = '';
      });
    }
  }

  function renderTodo(todo) {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) {
      li.classList.add('completed');
    }
    todoList.appendChild(li);
  }
});
