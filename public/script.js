const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskList = document.getElementById('task-list');

// Function to fetch tasks and display them
const fetchTasks = async () => {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.title}
            <button onclick="deleteTask(${task.id}, this)">Delete</button>
        `;
        taskList.appendChild(li);
    });
};

// Function to handle form submission
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskTitle.value;

    // Create a new task
    await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed: false }),
    });

    taskTitle.value = '';
    fetchTasks();
});

// Function to delete a task
const deleteTask = async (id, button) => {
    const li = button.parentElement; // Get the li element
    li.classList.add('fade-out'); // Add fade-out class

    // Wait for the fade-out animation to complete before deleting
    li.addEventListener('animationend', async () => {
        await fetch(`/tasks/${id}`, {
            method: 'DELETE',
        });
        fetchTasks(); // Refresh the task list
    });
};

// Fetch tasks on page load
fetchTasks();
