// A todo lista elemeit tároló tömb
const todoList = [];

// Todo lista elemeinek megjelenítése és frissítése
function updateTodoList() {
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = '';

  let completedCount = 0;

  todoList.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.className = `task ${task.completed ? 'completed' : ''}`;
    taskElement.innerHTML = `
            <input type="checkbox" data-index="${index}" ${
      task.completed ? 'checked' : ''
    }>
            ${task.text}
        `;
    todoListElement.appendChild(taskElement);

    if (task.completed) {
      completedCount++;
    }
  });

  // Frissítsük a teljesítési százalékot
  const progressElement = document.getElementById('progress');
  const completionPercentage = (completedCount / todoList.length) * 100;
  progressElement.textContent = `Elvégzés: ${completionPercentage.toFixed(2)}%`;
}

// Új feladat hozzáadása
document
  .getElementById('new-task')
  .addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && this.value.trim() !== '') {
      todoList.push({ text: this.value, completed: false });
      this.value = '';
      updateTodoList();
    }
  });

// Feladat elvégzésének kezelése
document
  .getElementById('todo-list')
  .addEventListener('change', function (event) {
    if (event.target.type === 'checkbox') {
      const index = event.target.getAttribute('data-index');
      todoList[index].completed = event.target.checked;
      updateTodoList();
    }
  });

// Kezdeti todo lista frissítése
updateTodoList();
