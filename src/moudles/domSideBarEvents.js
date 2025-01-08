export { sideBarEvents };
import { createProject, createProjectList } from "./projectCreate.js";
import { Item } from "./itemClass.js";
import { createToDoItemAsElement } from "./domToDoItem.js";
import {formInputsToObject ,getCheckedRadioInput} from "./functionsForForms.js"
import { screenUpdate } from "./screenController.js";

function sideBarEvents(projectsList) {
  const sideBar = document.querySelector("nav");
  sideBar.addEventListener("click", (e) => {
    let target;

    //for closing and opening the sidebar with svg rotation
    target = e.target.closest("#sideBarTop button");
    if (target) {
      target.classList.toggle("rotate");
      sideBar.classList.toggle("close");
    }

    target = e.target.closest("div > .dropDownBtn");
    if (target) {
      target.classList.toggle("rotate");
      let projectsSubMenu = sideBar.querySelector("#projectsSubMenu");
      projectsSubMenu.classList.toggle("show");
    }

    target = e.target.closest("#addTaskButton");
    if (target) {
      let dialog = sideBar.querySelector(".addTaskDialog");
      dialog.showModal();
    }

    //add task dialog inside add button behavior

    target = e.target.matches("#addTaskDialogAdd");
    if (target) {
      //reading the values from the form and storing them

      let addTaskForm = sideBar.querySelector("#addTaskForm");
      addItemFromDom(projectsList, addTaskForm);


      ///if ID exists deletes it

      screenUpdate(projectsList);
    }

    //if pressed outside the dialog form the dialog will close itself.
    target = e.target.matches("li .addTaskDialog");
    if (target) {
      let dialog = sideBar.querySelector(".addTaskDialog");
      dialog.close();
    }

    //when project submenu add button clicked
    target = e.target.closest("#addProjectButton");
    if (target) {
      //opening the sub menu if not open
      //make sure the submenu is open...
      let dropDownBtn = sideBar.querySelector(".dropMenu .dropDownBtn");
      dropDownBtn.classList.add("rotate");
      let projectsSubMenu = sideBar.querySelector("#projectsSubMenu");
      projectsSubMenu.classList.add("show");

      let ulDiv = projectsSubMenu.querySelector("div");
      subMenuAddButton(ulDiv, projectsList);
    }
  });
}

function subMenuAddButton(ulDivElement, projectList) {
  //the if statement helps avoid adding twice if case if its already present
  if (!ulDivElement.querySelector("#addProjectLi")) {
    //add a list item

    let newElements = {
      li: document.createElement("li"),
      div: document.createElement("div"),
      input: document.createElement("input"),
      button: document.createElement("button"),
    };

    newElements.li.id = "addProjectLi";
    newElements.li.appendChild(newElements.input);
    newElements.input.id = "addProjectInput";
    newElements.li.appendChild(newElements.button);

    newElements.button.innerText = "ADD";
    newElements.button.classList.add("buttonStyle");

    //good practice to stop events when not needed anymore, if the event is still attached to an element that not deleted, it will still be active
    //even if its father funciton is ended
    const abortSignal = new AbortController();

    newElements.button.addEventListener("click", () => {
      let newProject = createProject(newElements.input.value);
      projectList.addProject(newProject);
      screenUpdate(projectList);
      newElements.li.remove();
      //stops any next event from happening
      abortSignal.abort();
    });
    //close the li if clicked outside,

    document.addEventListener(
      "click",
      (e) => {
        if (
          !e.target.closest("#addProjectLi") &&
          !e.target.closest("#addProjectButton")
        ) {
          newElements.li.remove();
          abortSignal.abort();
        }
      },
      { signal: abortSignal.signal }
    );

    ulDivElement.insertBefore(newElements.li, ulDivElement.firstChild);
  }
}

function addItemFromDom(projectsList, addTaskForm) {
  let formInputs = formInputsToObject(addTaskForm);
  console.table(formInputs);
  const projectName = formInputs.textInputs['project-choice'].value;
  const itemTitle = formInputs.textInputs['TaskName'].value;
  const description = formInputs.textAreaInputs['description'].value;
  const priority = getCheckedRadioInput(formInputs.radioInputs).value;
  const forToday = formInputs.checkBoxInputs['forToday'].checked;
  const dueDate = formInputs.dateInputs['dueDate'].value;
  const status =  formInputs.selectInputs['status'].value;
  const notes = formInputs.textInputs['notes'].value;
  let project = projectsList.findProjectByName(projectName);

  let newItem = new Item(
    itemTitle,
    description,
    dueDate,
    priority,
    notes,
    status
  );
  //the function for forToday and status are separated to update screen there own functions.
  newItem.forToday = forToday;

  //check if project already exists if not create one, and add item
  if (project) {
    project.addItem(newItem);
  } else {
    project = createProject(projectName);
    projectsList.addProject(project);
    project.addItem(newItem);

    //datalist function
  }

  let newItemDiv = createToDoItemAsElement(newItem);
  let mainDiv = document.querySelector("#main");
  mainDiv.appendChild(newItemDiv);
}

