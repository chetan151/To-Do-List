const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

addTaskBtn.addEventListener('click', function () {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTaskToList(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = "";
  }
});

function addTaskToList(taskText, isCompleted = false) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = isCompleted;
  checkbox.addEventListener('change', function () {
    updateTaskInLocalStorage(taskText, checkbox.checked);
    li.classList.toggle('completed', checkbox.checked);
  });

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete';
  deleteBtn.addEventListener('click', function () {
    li.remove();
    removeTaskFromLocalStorage(taskText);
  });

  li.appendChild(checkbox);
  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);
  li.className = isCompleted ? 'completed' : '';
  taskList.appendChild(li);
}

function saveTaskToLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToList(task.text, task.completed));
}

function removeTaskFromLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function updateTaskInLocalStorage(taskText, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find(task => task.text === taskText);
  if (task) task.completed = isCompleted;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
