const form = document.querySelector('#task-form');

loadEventListeners();

var today = new Date();
document.getElementById("task-date").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);


function loadEventListeners() {
    
    form.addEventListener('submit', function (e) {
      
        e.preventDefault();
        addTask();
      
  });

  }

var tableBody = document.getElementById("table-in-progress");

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

function addTaskToTable() {
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var row = document.createElement("tr");

    td1.innerHTML = document.getElementById("task-name").value;
    td2.innerHTML  = document.getElementById("task-assignee").value;
    td3.innerHTML  = document.getElementById("task-date").value;

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
    var taskName = document.getElementById("task-name");
    taskName.value = "";
    var taskAssignee = document.getElementById("task-assignee");
    taskAssignee.value = "";
    var taskDate = document.getElementById("task-date");
    taskDate.value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

}

function transferToSecondTable() {
    var checkboxes = document.getElementsByName('checkboxName');
    console.log("checkbox length" + checkboxes.length); 
    var completedTable = document.getElementById("table-completed");
     
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

            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            completedTable.appendChild(row);
            tableBody.deleteRow(t);
    
        }
    }
}
