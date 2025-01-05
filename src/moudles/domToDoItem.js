export { createToDoItemAsElement };

function createToDoItemAsElement(toDoItem) {
  // let mainDiv = document.querySelector('#main');

  //create all the needed elements with their initial value...
  //   let itemElement = {
  //     mainDiv: document.createElement("div"),

  //     nameSpan: (function () {
  //       let span = document.createElement("span");
  //       span.innerText = toDoItem.title;
  //       return span;
  //     })(),

  //     dueDateSpan: (function () {
  //       let span = document.createElement("span");
  //       span.innerText = toDoItem.dueDate;
  //       return span;
  //     })(),

  //     notesSpan: (function () {
  //       let span = document.createElement("span");
  //       span.innerText = toDoItem.notes;
  //       return span;
  //     })(),

  //     rightButton: document.createElement("button"),

  //     rightDiv: (function () {
  //       let div = document.createElement("div");
  //       div.classList.add("rightDiv");

  //       return div;
  //     })(),
  //     descriptionSpan: (function () {
  //       let span = document.createElement("span");
  //       span.innerText = toDoItem.description;
  //       return span;
  //     })(),

  //     bottomButton: document.createElement("button"),
  //     bottomDiv: (function () {
  //       let div = document.createElement("div");
  //       div.classList.add("bottomDiv");
  //       return div;
  //     })(),

  //     todayCheckBox: (function () {
  //       let checkBox = document.createElement("input");
  //       checkBox.type = "checkbox";
  //       checkBox.classList.add("todayCheckBox");
  //       // if(toDoItem.forToday){
  //       //     checkBox.checked = true;
  //       // }
  //       checkBox.checked = toDoItem.forToday;
  //       return checkBox;
  //     })(),

  //     completeCheckBox: (function () {
  //       let checkBox = document.createElement("input");
  //       checkBox.type = "checkbox";
  //       checkBox.classList.add("completeCheckBox");
  //       if (toDoItem.status == "completed") {
  //         checkBox.checked = true;
  //       }

  //       return checkBox;
  //     })(),
  //   };

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
  // if(toDoItem.forToday){
  //     checkBox.checked = true;
  // }
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
  mainDiv = setBorderByPriority(mainDiv, toDoItem.priority);

  ///setting border by priority

  //   itemElement.mainDiv.appendChild(itemElement.nameSpan);
  //   itemElement.mainDiv.appendChild(itemElement.dueDateSpan);
  //   itemElement.mainDiv.appendChild(itemElement.notesSpan);

  //   itemElement.rightDiv.appendChild(itemElement.descriptionSpan);
  //   itemElement.mainDiv.appendChild(itemElement.rightDiv);
  //   itemElement.mainDiv.appendChild(itemElement.rightButton);

  //   itemElement.bottomDiv.appendChild(itemElement.todayCheckBox);
  //   itemElement.bottomDiv.appendChild(itemElement.completeCheckBox);
  //   itemElement.mainDiv.appendChild(itemElement.bottomDiv);
  //   itemElement.mainDiv.appendChild(itemElement.bottomButton);

  return mainDiv;
}

function setBorderByPriority(div, priority) {

    //converting to a number from string
    //or i can just state every number as string...
//   priority = +priority;

  switch (priority) {
    case 1:
      div.style.borderTop = "4px solid red";
      break;

    case 2:
        console.log("INNNN");
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
