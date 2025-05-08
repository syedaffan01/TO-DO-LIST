// Initialize app state
let currentUser = null;

// Show/hide sections with animation
function toggleSections(showAuth = true) {
  const authSection = document.getElementById('auth');
  const todoSection = document.getElementById('todo');

  if (showAuth) {
    authSection.style.display = 'block';
    todoSection.style.display = 'none';
    setTimeout(() => authSection.classList.add('active'), 10);
    todoSection.classList.remove('active');
  } else {
    authSection.style.display = 'none';
    todoSection.style.display = 'block';
    setTimeout(() => todoSection.classList.add('active'), 10);
    authSection.classList.remove('active');
  }
}

// Login function
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    currentUser = username;
    document.getElementById('greet').textContent = `Welcome, ${username}!`;
    toggleSections(false);
    document.getElementById('auth-form').reset();
  } else {
    alert('Please enter username and password');
  }
}

// Register function (simulated)
function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    alert('Registration successful! Please login.');
    document.getElementById('auth-form').reset();
  } else {
    alert('Please enter username and password');
  }
}

// Add task function
function addTask() {
  const category = document.getElementById('category').value;
  const task = document.getElementById('task').value;
  const taskList = document.getElementById('taskList');

  if (task) {
    const li = document.createElement('li');
    li.textContent = `${category ? `[${category}] ` : ''}${task}`;
    taskList.appendChild(li);
    document.getElementById('task-form').reset();
  } else {
    alert('Please enter a task');
  }
}

// Initialize
toggleSections(true);