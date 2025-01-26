
document.addEventListener('DOMContentLoaded', function () {
  
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks); 
            tasks.forEach(task => addTaskToDOM(task)); 
        }
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks)); 
    }

    function addTaskToDOM(taskText) {
    
        const listItem = document.createElement('li');
        listItem.textContent = taskText; 

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; 
        removeButton.className = 'remove-btn'; 

        removeButton.onclick = function () {
        
            taskList.removeChild(listItem);

            tasks = tasks.filter(task => task !== taskText);

            saveTasks();
        };

        listItem.appendChild(removeButton);

        taskList.appendChild(listItem);
    }

   
    function addTask() {
     
        const taskText = taskInput.value.trim();

    
        if (taskText === "") {
            alert("Please enter a task!");
            return; 
        }


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
