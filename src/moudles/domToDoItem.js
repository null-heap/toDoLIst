export { createToDoItemAsElement };

function createToDoItemAsElement(toDoItem) {

  let mainDiv = document.createElement("div");
  mainDiv.classList.add("toDoItemDiv");
  //
  let nameTitle = document.createElement("span");
  nameTitle.innerText = "Name:";

  let nameSpan = document.createElement("span");
  nameSpan.innerText = toDoItem.title;

  nameTitle.appendChild(nameSpan);
  //
  let dueDateTitle = document.createElement("span");
  dueDateTitle.innerText = "Due-Date:";

  let dueDateSpan = document.createElement("span");
  dueDateSpan.innerText = toDoItem.dueDate;
  dueDateTitle.appendChild(dueDateSpan);
  //
  let notesSpan = document.createElement("span");
  notesSpan.innerText = toDoItem.notes;
  //
  let rightButton = document.createElement("button");
  //
  let rightDiv = document.createElement("div");
  rightDiv.classList.add("rightDiv");
  //
  let descriptionSpan = document.createElement("span");
  descriptionSpan.innerText = toDoItem.description;
  //
  let bottomButton = document.createElement("button");
  //
  let bottomDiv = document.createElement("div");
  bottomDiv.classList.add("bottomDiv");
  //
  let todayCheckBox = document.createElement("input");
  todayCheckBox.type = "checkbox";
  todayCheckBox.classList.add("todayCheckBox");
  todayCheckBox.checked = toDoItem.forToday;
  //

  let completeCheckBox = document.createElement("input");
  completeCheckBox.type = "checkbox";
  completeCheckBox.classList.add("completeCheckBox");
  if (toDoItem.status == "completed") {
    completeCheckBox.checked = true;
  }

  mainDiv.appendChild(nameTitle);
  mainDiv.appendChild(dueDateTitle);
  mainDiv.appendChild(notesSpan);

  rightDiv.appendChild(descriptionSpan);
  mainDiv.appendChild(rightDiv);
  mainDiv.appendChild(rightButton);

  bottomDiv.appendChild(todayCheckBox);
  bottomDiv.appendChild(completeCheckBox);
  mainDiv.appendChild(bottomDiv);
  mainDiv.appendChild(bottomButton);
  console.log(toDoItem.priority);

  //set border by priority...
  mainDiv = setBorderByPriority(mainDiv, toDoItem.priority);
  return mainDiv;
}

function setBorderByPriority(div, priority) {

  switch (priority) {
    case 1:
      div.style.borderTop = "4px solid red";
      break;

    case 2:
      div.style.borderTop = "4px solid darkorange";
      break;

    case 3:
      div.style.borderTop = "4px solid darkblue";
      break;

    case 4:
      div.style.borderTop = "4px solid darkgreen";
      break;

    default:
      break;
  }

  return div;
}
