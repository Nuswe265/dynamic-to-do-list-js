// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize an array to store tasks
    let tasks = [];

    // Load tasks from Local Storage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks); // Parse JSON string into an array
            tasks.forEach(task => addTaskToDOM(task)); // Add each task to the DOM
        }
    }

    // Save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Convert tasks array to JSON
    }

    // Add a task to the DOM
    function addTaskToDOM(taskText) {
        // Create a new list item (li) element
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // Set the text content of the list item

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set the button text
        removeButton.className = 'remove-btn'; // Add a class for styling

        // Assign an onclick event to the remove button
        removeButton.onclick = function () {
            // Remove the task from the DOM
            taskList.removeChild(listItem);

            // Remove the task from the tasks array
            tasks = tasks.filter(task => task !== taskText);

            // Save the updated tasks array to Local Storage
            saveTasks();
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);
    }

    // Add a new task
    function addTask() {
        // Get the value from the input field and trim whitespace
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return; // Exit the function if input is empty
        }

        // Add the task to the DOM
        addTaskToDOM(taskText);

        // Add the task to the tasks array
        tasks.push(taskText);

        // Save the updated tasks array to Local Storage
        saveTasks();

        // Clear the input field
        taskInput.value = '';
    }

    // Add event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add event listener to handle "Enter" key press in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(); // Call addTask when the Enter key is pressed
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
