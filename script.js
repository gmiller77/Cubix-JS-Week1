// A todo lista elemeit tároló tömb
const todoList = [];

// Todo lista elemeinek megjelenítése és frissítése
function updateTodoList() {
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = '';

  let completedCount = 0;

  if (todoList.length === 0) {
    // Ha nincs TODO elem, "Nincs feladat megadva." szöveget jelenítünk meg
    const noTasksElement = document.createElement('p');
    noTasksElement.textContent = 'Nincs feladat megadva.';
    todoListElement.appendChild(noTasksElement);
  } else {
    todoList.forEach((task, index) => {
      const taskElement = document.createElement('li');
      taskElement.className = `task ${task.completed ? 'completed' : ''}`;
      taskElement.innerHTML = `
                <input type="checkbox" data-index="${index}" ${
        task.completed ? 'checked' : ''
      }>
                <label>${task.text}</label>
                <button class="delete-button" data-index="${index}">Törlés</button>
            `;
      todoListElement.appendChild(taskElement);

      if (task.completed) {
        completedCount++;
      }
    });
  }

  // Frissítsük a teljesítési százalékot vagy a "Nincs feladat megadva." szöveget
  const progressElement = document.getElementById('progress');
  if (todoList.length > 0) {
    const completionPercentage = (completedCount / todoList.length) * 100;
    progressElement.textContent = `Elvégzés: ${completionPercentage.toFixed(
      2
    )}%`;
  } else {
    progressElement.textContent = 'Nincs feladat megadva.';
  }

  // Törlés gombokhoz eseménykezelők hozzáadása
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      const index = this.getAttribute('data-index');
      todoList.splice(index, 1);
      updateTodoList();
    });
  });

  // Összes kijelölése vagy kijelölés megszüntetése
  const selectAllCheckbox = document.getElementById('select-all-checkbox');
  if (todoList.length > 0) {
    const allCompleted = todoList.every((task) => task.completed);
    selectAllCheckbox.checked = allCompleted;
    selectAllCheckbox.disabled = false;
  } else {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.disabled = true;
  }

  // Kijelöltek törlése gomb állapotának frissítése
  const deleteSelectedButton = document.getElementById(
    'delete-selected-button'
  );
  const selectedItems = todoList.filter((task) => task.completed);
  deleteSelectedButton.disabled = selectedItems.length === 0;
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

// Kijelöltek törlése gomb eseménykezelő
document
  .getElementById('delete-selected-button')
  .addEventListener('click', function () {
    const indexesToDelete = [];
    todoList.forEach((task, index) => {
      if (task.completed) {
        indexesToDelete.push(index);
      }
    });

    // Töröljük az elemeket fordított sorrendben, hogy ne változzon meg az indexek sorrendje
    for (let i = indexesToDelete.length - 1; i >= 0; i--) {
      todoList.splice(indexesToDelete[i], 1);
    }

    updateTodoList();
  });

// Összes kijelölése vagy kijelölés megszüntetése
document
  .getElementById('select-all-checkbox')
  .addEventListener('change', function () {
    if (todoList.length > 0) {
      const isChecked = this.checked;
      todoList.forEach((task) => {
        task.completed = isChecked;
      });
      updateTodoList();
    } else {
      this.checked = false;
    }
  });

// Kezdeti todo lista frissítése
updateTodoList();
