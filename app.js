var taskInput = document.getElementById("new-task");
var addButton = document.getElementById("add-button");
var tasksToDo = document.getElementById("incomplete-tasks");
var tasksDone = document.getElementById("completed-tasks");

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var deleteButton = document.createElement("button");

  label.innerText = taskString;
  checkBox.type = "checkbox";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  var listItem = createNewTaskElement(taskInput.value);
  if (listItem === "null") {
    console.log("no data entered");
  } else {
    tasksToDo.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  }
};

var deleteTask = function () {
  console.log("deleting");
  var listItem = this.parentNode;
  listItem.parentNode.removeChild(listItem);
};

var taskCompleted = function () {
  var listItem = this.parentNode;
  tasksDone.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  var listItem = this.parentNode;
  tasksToDo.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.addEventListener("click", addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var deleteButton = taskListItem.querySelector("button.delete");
  if (deleteButton) {
    deleteButton.addEventListener("click", deleteTask);
  }

  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < tasksToDo.children.length; i++) {
  bindTaskEvents(tasksToDo.children[i], taskCompleted);
}

for (var i = 0; i < tasksDone.children.length; i++) {
  bindTaskEvents(tasksDone.children[i], taskIncomplete);
}
