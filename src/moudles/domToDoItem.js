export {
  createToDoItemAsElement,
  addItemFromDom,
  toDoItemsClickEvents,
  addItemToDom,
  displayItems,
};
import {
  formInputsToObject,
  getCheckedRadioInput,
  preFillFormFromItem,
  clearForm,
} from "./functionsForForms.js";
import { Item } from "./itemClass.js";
import { createProject } from "./projectCreate.js";
import { screenUpdate } from "./screenController.js";

import setToDoComplete from "./setToDoComplete.js";
import { isPast, set } from "date-fns";

function createToDoItemAsElement(toDoItem) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("toDoItemDiv");
  mainDiv.dataset.itemId = toDoItem.id;
  //
  let startDiv = document.createElement("div");
  startDiv.classList.add("startDiv");
  //
  let nameDiv = document.createElement("div");
  nameDiv.classList.add("textDiv");
  let nameTitle = document.createElement("span");
  nameTitle.innerText = "Name:";

  let nameSpan = document.createElement("span");
  nameSpan.innerText = toDoItem.title;

  nameDiv.append(nameTitle, nameSpan);
  //

  let dueDateDiv = document.createElement("div");
  dueDateDiv.classList.add("textDiv");

  let dueDateTitle = document.createElement("span");
  dueDateTitle.innerText = "Due-Date:";

  let dueDateSpan = document.createElement("span");
  dueDateSpan.innerText = toDoItem.dueDate;

  //if past due date will color red
  if (isPast(toDoItem.dueDate)) {
    dueDateSpan.style.color = "red";
  }
  dueDateDiv.append(dueDateTitle, dueDateSpan);
  //
  let notesDiv = document.createElement("div");
  notesDiv.classList.add("textDiv");

  let notesTitle = document.createElement("span");
  notesTitle.innerText = "Notes:";
  let notesSpan = document.createElement("span");
  notesSpan.innerText = toDoItem.notes;
  notesDiv.append(notesTitle, notesSpan);
  //
  let rightButton = document.createElement("button");
  rightButton.classList.toggle("rightButton");
  //
  let rightDiv = document.createElement("div");
  rightDiv.classList.add("rightDiv");
  //

  let descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("textDiv", "descriptionDiv");

  let descriptionTitle = document.createElement("span");
  descriptionTitle.innerText = "Description:";
  let descriptionP = document.createElement("p");
  descriptionP.innerText = toDoItem.description;
  descriptionP.classList.add("descriptionSpan");
  descriptionDiv.append(descriptionTitle, descriptionP);
  //
  let bottomButton = document.createElement("button");
  bottomButton.classList.toggle("bottomButton");
  //
  let bottomDiv = document.createElement("div");
  bottomDiv.classList.add("bottomDiv");
  //
  let todayCheckBoxDiv = document.createElement("div");
  todayCheckBoxDiv.classList.add("textDiv");

  //today checkbox
  let todayCheckBoxTitle = document.createElement("span");
  todayCheckBoxTitle.innerText = "Today?:";
  let todayCheckBox = document.createElement("input");
  todayCheckBox.type = "checkbox";
  todayCheckBox.classList.add("todayCheckBox");
  todayCheckBox.checked = toDoItem.forToday;
  todayCheckBoxDiv.append(todayCheckBoxTitle, todayCheckBox);
  //
  let completeCheckBoxDiv = document.createElement("div");
  completeCheckBoxDiv.classList.add("textDiv");

  let completeCheckBoxTitle = document.createElement("span");
  completeCheckBoxTitle.innerText = "Complete?:";
  let completeCheckBox = document.createElement("input");
  completeCheckBox.type = "checkbox";
  completeCheckBox.classList.add("completeCheckBox");
  //if status is complete will disable the checkbox
  if (toDoItem.status) {
    completeCheckBox.checked = true;
    completeCheckBox.disabled = true;
    todayCheckBox.disabled = true;
  }
  completeCheckBoxDiv.append(completeCheckBoxTitle, completeCheckBox);
  //

  //
  let topDiv = document.createElement("div");
  topDiv.classList.add("topDiv");
  topDiv.classList.toggle("hide");

  let idSpan = document.createElement("span");
  idSpan.innerText = "Item Id: " + toDoItem.id;

  //can also add father project name

  let editButton = document.createElement("button");
  editButton.classList.add("editButton");

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");

  topDiv.append(idSpan, editButton, deleteButton);

  startDiv.append(nameDiv, dueDateDiv, notesDiv);

  mainDiv.append(
    topDiv,
    startDiv,
    rightDiv,
    rightButton,
    bottomDiv,
    bottomButton
  );

  rightDiv.appendChild(descriptionDiv);

  bottomDiv.append(todayCheckBoxDiv, completeCheckBoxDiv);

  startDiv.classList.toggle("bottomCollapse");
  bottomDiv.classList.toggle("hide");
  startDiv.classList.toggle("rightCollapse");
  rightDiv.classList.toggle("hide");
  //set border by priority...
  mainDiv = setBorderByPriority(mainDiv, toDoItem.priority);
  return mainDiv;
}

function setBorderByPriority(div, priority) {
  switch (priority) {
    case 0:
      div.style.borderTop = div.style.borderLeft;
      break;

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

function toDoItemsClickEvents(projectsList) {
  let mainDiv = document.querySelector("#main");

  mainDiv.addEventListener("click", (e) => {
    let target;

    target = e.target.matches("button.bottomButton");
    if (target) {
      //getting the toDoItemDiv and extracting its child...

      let toDoItemDiv = e.target.parentNode;
      let startDiv = toDoItemDiv.querySelector(".startDiv");
      startDiv.classList.toggle("bottomCollapse");
      let bottomDiv = toDoItemDiv.querySelector(".bottomDiv");
      bottomDiv.classList.toggle("hide");
    }

    target = e.target.matches("button.rightButton");
    if (target) {
      //getting the toDoItemDiv and extracting its child...

      let toDoItemDiv = e.target.parentNode;
      let startDiv = toDoItemDiv.querySelector(".startDiv");
      startDiv.classList.toggle("rightCollapse");
      let rightDiv = toDoItemDiv.querySelector(".rightDiv");
      rightDiv.classList.toggle("hide");

      let topDiv = toDoItemDiv.querySelector(".topDiv");
      topDiv.classList.toggle("hide");
    }

    target = e.target.closest(".editButton");
    if (target) {
      //get the item id
      let itemId = target.closest(".toDoItemDiv").dataset.itemId;

      //find its object
      let toDoItem = projectsList.findItemById(itemId);

      let editTaskForm = mainDiv.querySelector("#editTaskForm");
      //clear dialog form and the itemId from the form
      clearForm(editTaskForm, true);
      //set the itemId on the form
      editTaskForm.dataset.itemId = itemId;
      //prefill dialog form
      preFillFormFromItem(editTaskForm, toDoItem, projectsList);
      //open dialog
      let editDialog = mainDiv.querySelector("#editTaskDialog");

      editDialog.showModal();
    }

    target = e.target.matches("#editTaskDialogAdd");
    if (target) {
      //need to get the item id through the dialog modal

      //need to delete the dom Item /// maybe just screenUpdate() --

      //i have two option
      //replace individually the item div in dom or
      //just screenUpdate -- it will recreate all the dom items...
      //what is the best practice??

      //i will replace individually for now...

      //get the item id

      let editTaskForm = mainDiv.querySelector("#editTaskForm");
      let itemId = editTaskForm.dataset.itemId;
      //find its object
      projectsList.deleteItemById(itemId);

      let newItem = addItemFromDom(projectsList, editTaskForm, itemId);

      //replace item in Dom...
      replaceItemInDomById(newItem);

      //update the changes
      screenUpdate(projectsList);
    }

    target = e.target.closest(".deleteButton");
    if (target) {
      //get the item id
      let item = target.closest(".toDoItemDiv");

      let result = confirm(
        "Are you sure your want to delete item " + item.dataset.itemId + " ???"
      );
      if (result) {
        projectsList.deleteItemById(item.dataset.itemId);

        //delete from dom
        deleteItemDiv(item);

        screenUpdate(projectsList);
      }
    }

    //checkbox forToday functionality
    target = e.target.matches(".toDoItemDiv .todayCheckBox");
    if (target) {
      let toDoItemDiv = e.target.closest(".toDoItemDiv");
      let toDoItemObject = projectsList.findItemById(
        toDoItemDiv.dataset.itemId
      );
      let checkBox = toDoItemDiv.querySelector(".todayCheckBox");

      ///might implement as function in the future
      toDoItemObject.forToday = checkBox.checked;

      //for testing...
      let itemArray = projectsList.forTodayItemsArray();
      console.table(itemArray);
    }

    //complete checkbox functionality
    target = e.target.matches(".toDoItemDiv .completeCheckBox");
    if (target) {
      let toDoItemDiv = e.target.closest(".toDoItemDiv");
      let toDoItemObject = projectsList.findItemById(
        toDoItemDiv.dataset.itemId
      );
      let checkBox = toDoItemDiv.querySelector(".completeCheckBox");


      if (checkBox.checked) {
        checkBox.disabled = true;
        setToDoComplete(toDoItemObject);
        setBorderByPriority(toDoItemDiv, toDoItemObject.priority);

        let todayCheckBox = toDoItemDiv.querySelector(".todayCheckBox");
        todayCheckBox.disabled = true;
      }
    }

    target = e.target.closest("#editTaskFormClear");
    if (target) {
      e.preventDefault();
      let editForm = mainDiv.querySelector("#editTaskForm");
      clearForm(editForm, false);
    }

    target = e.target.matches("#editTaskDialog");
    //if pressed outside the dialog form the dialog will close itself.
    if (target) {
      let dialog = mainDiv.querySelector("#editTaskDialog");
      dialog.close();
    }
  });
}

function addItemFromDom(projectsList, taskForm, id) {
  let formInputs = formInputsToObject(taskForm);
  const projectName = formInputs.textInputs["project-choice"].value;
  const itemTitle = formInputs.textInputs["TaskName"].value;
  const description = formInputs.textAreaInputs["description"].value;
  let priority = getCheckedRadioInput(formInputs.radioInputs).value;
  let forToday = formInputs.checkBoxInputs["forToday"].checked;
  const dueDate = formInputs.dateInputs["dueDate"].value;
  const status = formInputs.selectInputs["status"].value == "completed" ? 1 : 0;
  const notes = formInputs.textInputs["notes"].value;
  let project = projectsList.findProjectByName(projectName);

  let newItem;

  //if set as complete will delete the priority...
  if (priority != 0 && status) {
    priority = 0;
    forToday = false;
  }

  //if id is supplied and not already exists will add the supplied id...
  if (id && !projectsList.findItemById(id)) {
    newItem = new Item(
      itemTitle,
      description,
      dueDate,
      priority,
      notes,
      status,
      forToday,
      id
    );
  } else {
    newItem = new Item(
      itemTitle,
      description,
      dueDate,
      priority,
      notes,
      status,
      forToday
    );
  }

  //check if project already exists if not create one, and add item
  if (project) {
    project.addItem(newItem);
  } else {
    project = createProject(projectName);
    projectsList.addProject(project);
    project.addItem(newItem);
  }

  return newItem;
}

function replaceItemInDomById(newItem) {
  let mainDiv = document.querySelector("#main");
  let oldDomItem = mainDiv.querySelector(
    `[class="toDoItemDiv"][data-item-id="${newItem.id}"]`
  );
  let newDomItem = createToDoItemAsElement(newItem);
  oldDomItem.replaceWith(newDomItem);
}


function displayItems(itemArray) {
  let mainDiv = document.querySelector("#main");
  let itemDivs = mainDiv.querySelectorAll(".toDoItemDiv");
  itemDivs.forEach((itemDiv) => {
    deleteItemDiv(itemDiv);
  });

  if (itemArray && itemArray.length) {
    itemArray.forEach((item) => {
      addItemToDom(item);
    });
  }
}

let animationDelay = 400;

function addItemToDom(newItem) {
  let newItemDiv = createToDoItemAsElement(newItem);
  let mainDiv = document.querySelector("#main");

  //the timeout is for the transition animation
  setTimeout(() => {
    mainDiv.appendChild(newItemDiv);
  }, animationDelay);
}

function deleteItemDiv(itemDiv){
  //for the transition animation
  itemDiv.classList.add("close");

  //remove the itemDiv after the transition of animation
  setTimeout(() => {
    itemDiv.remove();
  }, (animationDelay-100));
}