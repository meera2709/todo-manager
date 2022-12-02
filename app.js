const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('#clear-tasks');
const clearBtnInProgress = document.querySelector('#clear-tasks-inprogress');

loadEventListeners();

var today = new Date();
document.getElementById("task-date").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);


function loadEventListeners() {

    document.addEventListener('DOMContentLoaded', getTasks);
    clearBtn.addEventListener('click', clearTasks);
    clearBtnInProgress.addEventListener('click', clearTasksInProgress);
    
    form.addEventListener('submit', function (e) {
      
        e.preventDefault();
        addTask();
      
  });
}

//To clear all the asks in progress upon clicking clear button
function clearTasksInProgress() {
    var tableBody = document.getElementById("table-in-progress");
    console.log(tableBody.rows.length);
    var len = tableBody.rows.length;
    while (len>1){
        tableBody.deleteRow(len-1);
        len--;
    }
    document.getElementById('clear-tasks-inprogress').style.visibility = "hidden";
    var exists = localStorage.getItem('tasksInProgress');
    if(exists != null ){
        localStorage.removeItem('tasksInProgress');
    }  
}

//To clear all the tasks completed upon clicking clear button
function clearTasks() {
    var completedTable = document.getElementById("table-completed");
    console.log(completedTable.rows.length);
    var len = completedTable.rows.length;
    while (len>1){
        completedTable.deleteRow(len-1);
        len--;
    }
    document.getElementById('clear-tasks').style.visibility = "hidden";
    // Clear from LS
    localStorage.removeItem('tasks');
  }
  
//To get tasks when DOM content loads
function getTasks() {
    var tableBody = document.getElementById("table-in-progress");
    if(tableBody.rows.length==1){
        document.getElementById('clear-tasks-inprogress').style.visibility = "hidden";
    }
    
    var completedTable = document.getElementById("table-completed");
    console.log(completedTable.rows.length)
    if(completedTable.rows.length==1){
        document.getElementById('clear-tasks').style.visibility = "hidden";
    }

    let tasks;
    let tasksInProgress;

    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    if(localStorage.getItem('tasksInProgress') === null){
        tasksInProgress = [];
      } else {
        tasksInProgress = JSON.parse(localStorage.getItem('tasksInProgress'));
    }
    
    tasks.forEach(function(task){
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      var td3 = document.createElement("td");
      var row = document.createElement("tr");
  
      var arr = task.split("$");
      td1.innerHTML = arr[0];
      td2.innerHTML = arr[1];
      td3.innerHTML = arr[2];
      row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        completedTable.appendChild(row);
    });

    tasksInProgress.forEach(function(task){
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var row = document.createElement("tr");

        const checkbox = document.createElement("INPUT");
        checkbox.type = "checkbox"; 
        checkbox.setAttribute('id', 'checkboxId')
        checkbox.setAttribute('name', 'checkboxName')
        checkbox.addEventListener("click", transferToSecondTable);
    
        var arr = task.split("$");
        td1.innerHTML = arr[0];
        td2.innerHTML = arr[1];
        td3.innerHTML = arr[2];
        row.appendChild(td1);
          row.appendChild(td2);
          row.appendChild(td3);
          row.appendChild(checkbox);
          tableBody.appendChild(row);
      });
}

var tableBody = document.getElementById("table-in-progress");

//To add task 
function addTask() {
    var taskName = document.getElementById("task-name");
    var taskAssignee = document.getElementById("task-assignee");
    var taskDate = document.getElementById("task-date");
    if(taskName.value == ''){
        alert('Please enter task name');
    }
    if(taskAssignee.value == ''){
        alert('Please enter the assignee for this task');
    }
    if(taskDate.value == ''){
        alert('Please enter due date');
    }
    if(taskName.value != '' && taskAssignee.value != '' && taskDate.value != ''){
        addTaskToTable();
    }
}

//To add task into in progress table
function addTaskToTable() {
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var row = document.createElement("tr");

    var li = "";

    td1.innerHTML = document.getElementById("task-name").value;
    td2.innerHTML  = document.getElementById("task-assignee").value;
    td3.innerHTML  = document.getElementById("task-date").value;
    li = td1.innerHTML + "$" + td2.innerHTML + "$" + td3.innerHTML;

    storeInProgressTaskInLocalStorage(li);

    const checkbox = document.createElement("INPUT");
    checkbox.type = "checkbox"; 
    checkbox.setAttribute('id', 'checkboxId')
    checkbox.setAttribute('name', 'checkboxName')
    checkbox.addEventListener("click", transferToSecondTable);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(checkbox);

    tableBody.appendChild(row);
    document.getElementById('clear-tasks-inprogress').style.visibility = "visible";
    var taskName = document.getElementById("task-name");
    taskName.value = "";
    var taskAssignee = document.getElementById("task-assignee");
    taskAssignee.value = "";
    var taskDate = document.getElementById("task-date");
    taskDate.value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

}

//To move the checked tasks from in progress table to completed table
function transferToSecondTable() {
    var checkboxes = document.getElementsByName('checkboxName');
    console.log("checkbox length" + checkboxes.length); 
    var completedTable = document.getElementById("table-completed");
    var li = "";
     
    for(var i = 0 ; i < checkboxes.length; i++ ){
        if(checkboxes[i].checked){
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");  
            var row = document.createElement("tr");
            var t= i + 1;
            td1.innerHTML = tableBody.rows[t].cells[0].innerHTML;
            td2.innerHTML = tableBody.rows[t].cells[1].innerHTML;
            td3.innerHTML = tableBody.rows[t].cells[2].innerHTML;
            li = td1.innerHTML + "$" + td2.innerHTML + "$" + td3.innerHTML;
            storeTaskInLocalStorage(li);
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            completedTable.appendChild(row);
            document.getElementById('clear-tasks').style.visibility = "visible";
            tableBody.deleteRow(t);
            clearTaskInProgressFromLocalStorage(t);    
        }
    }
}

//TO clear in progress tasks upon checking the checkbox
function clearTaskInProgressFromLocalStorage(t){
    console.log(t)
    var exists = localStorage.getItem('tasksInProgress');
    if(exists != null ){
        const arrInProgress = JSON.parse(localStorage.getItem('tasksInProgress'));
    if(arrInProgress.length>1){
        arrInProgress.splice(t-1,1)
        console.log(arrInProgress)
        localStorage.removeItem('tasksInProgress');
        localStorage.setItem('tasksInProgress', JSON.stringify(arrInProgress));
    }
    else{
        localStorage.removeItem('tasksInProgress');
        document.getElementById('clear-tasks-inprogress').style.visibility = "hidden";
    }
    }  
    
    
}

//To store completed tasks in local storage
function storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push(task);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
  }


//To store in progress tasks in local storage
function storeInProgressTaskInLocalStorage(task) {
    let tasksInProgress;

    if(localStorage.getItem('tasksInProgress') === null){
      tasksInProgress = [];
    } else {
      tasksInProgress = JSON.parse(localStorage.getItem('tasksInProgress'));
    }
  
    tasksInProgress.push(task);
  
    localStorage.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
    
  }


