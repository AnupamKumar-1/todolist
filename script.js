// Array to store task data
let tasklist = [];

// getting html elements
let input = document.getElementById('input-task');
let addTask = document.getElementById('new-task-add');
let todolist = document.getElementById('ul-group');

// Load data from local storage if available
const storedTasklist = localStorage.getItem('tasklist');
if (storedTasklist) {
    try {
        tasklist = JSON.parse(storedTasklist);
        showTasks();
    } catch (error) {
        console.error('Error parsing data from local storage:', error);
    }
}

// getting input by ckicking on add task button.

addTask.addEventListener('click', addTaskBYButton)
function addTaskBYButton() {

    if (!input.value) {
        return;
    }
    task = {
        input: input.value,
        id: Date.now().toString(),
        completed: false
    };
    
    input.value = '';
    createToDo(task);
};

// getting input by pressing 'Enter' key.

input.addEventListener('keydown', addNewTask);
function addNewTask(e) {
    if (e.key == 'Enter') {
       let input = e.target.value;
        if (!input) {
            return;
        }
       let task = {
            input: input,
            id: Date.now().toString(),
            completed: false
        };
        e.target.value = '';
        createToDo(task);
    }

};

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('tasklist', JSON.stringify(tasklist));
}

// Adding task
function createToDo(task) {
    if (task) {
        tasklist.push(task);
        showTasks();
        updateLocalStorage(); // Save data to local storage
        return;
    }
}


// rendering list to update tasks

function showTasks() {
    todolist.innerHTML = '';

    for (let i = 0; i < tasklist.length; i++) {
        createList(tasklist[i]);
    }
    taskStatus();

};

// creating list with checkbox and a delete button (- to delete a particular task).

function createList(task) {

    // creating li inside ul tag.
    let li = document.createElement('li')
    li.innerHTML = `
    
   <div class = 'list'>
    <div class = 'check'>
    <input type="checkbox" class="taskCheckbox" id = "${task.id}" ${task.completed ? 'checked' : ''} >
    </div>
    <div class = 'checklabel'>
    <label for ="${task.id}" class="tasks"> ${task.input}</label>
    </div>
    <div class = 'checkdelete'>
    <img src="resources/2.svg" id="${task.id}" class="del" " >
    </div>

    `;
    // appending tasks to list

    todolist.append(li);
}

// checking all task as completed.

function allDone(tasklist) {

    for (let i in tasklist) { 
        // updating tasklist array with task 'completed' value to true.
        tasklist[i].completed = true; 
    }
    showTasks();
    return;
}

// to display task status and total task count.

function taskStatus() {

    // total task count

    var totalTask = document.getElementById('total-tasks');
    if (tasklist.length == 1) {

        totalTask.innerHTML = tasklist.length + ' task';

    }
    else {

        totalTask.innerHTML = tasklist.length + ' tasks';
    }

    // total count of pending and completed tasks.

    let completedTaskCount = 0;
    for (let i in tasklist) {
        if (tasklist[i].completed == true) {
            completedTaskCount++;
        }
    }
    // displaying completed and pending count status.

    document.getElementById('completed').innerHTML = 'completed : ' + completedTaskCount;
    document.getElementById('pending').innerHTML = 'pending : ' + (tasklist.length - completedTaskCount);
};



// Adding click functions
document.addEventListener('click', clickAction);
function clickAction(e) {
    let target = e.target;
    let idNumber = target.id;
    // deleting a particular list by clicking on icon.
if (target.className == 'del') {
    let deleteTaskIndex = tasklist.findIndex(item => item.id == idNumber);
    if (deleteTaskIndex !== -1) {
        tasklist.splice(deleteTaskIndex, 1);
        showTasks();
        updateLocalStorage(); // Save data to local storage
    }
    return;
}
   // Completing a single task.
if (target.className == 'taskCheckbox') {
    let taskIndex = tasklist.findIndex(task => task.id == idNumber);
    if (taskIndex !== -1) {
        tasklist[taskIndex].completed = !tasklist[taskIndex].completed;
        showTasks();
        updateLocalStorage(); // Save data to local storage
    }
    return;
}

// Deleting all completed tasks.
if (target.className == 'ClearAllChecked') {
    tasklist = tasklist.filter(task => !task.completed);
    showTasks();
    updateLocalStorage(); // Save data to local storage
}

    // Checking all checkboxes and marking all tasks as completed.

    if (target.className == 'allChecked') {
       if(tasklist.length > 0 ){
        allDone(tasklist);
       }
     
    }
     updateLocalStorage();

}

