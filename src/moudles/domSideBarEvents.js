export { sideBarEvents };
import { createProject } from "./projectCreate.js";

import { addItemFromDom, addItemToDom, displayItems } from "./domToDoItem.js";

import { screenUpdate } from "./screenController.js";
import { clearForm } from "./functionsForForms.js";
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
      let dialog = sideBar.querySelector("#sideBarAddTaskDialog");
      dialog.showModal();
    }

    //add task dialog inside add button behavior

    target = e.target.matches("#addTaskDialogAdd");
    if (target) {
      //reading the values from the form and storing them

      let addTaskForm = sideBar.querySelector("#addTaskForm");
      addItemFromDom(projectsList, addTaskForm);
      screenUpdate(projectsList);
    }

    //if pressed outside the dialog form the dialog will close itself.
    target = e.target.matches("li #sideBarAddTaskDialog");
    if (target) {
      let dialog = sideBar.querySelector("#sideBarAddTaskDialog");
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

    //form clear button functionality
    target = e.target.closest("#addTaskFormClear");
    if (target) {
      e.preventDefault();
      let taskForm = sideBar.querySelector("#addTaskForm");
      clearForm(taskForm, false);
    }

    //projects submenu button functionality
    target = e.target.closest("#projectsSubMenu .projectButton");
    if (target) {
      let projectName = target.querySelector("span").innerText;
      let project = projectsList.findProjectByName(projectName);
      displayItems(project.list);
    }

    //delete project button functionality
    target = e.target.closest("#projectsSubMenu .deleteButton");
    if (target) {
      let answer = confirm("Are you sure you want to delete this project?");
      if (answer) {
        let projectName =
          target.nextElementSibling.querySelector("span").innerText;
        projectsList.removeProject(projectName);
        screenUpdate(projectsList);
      }
    }

    target = e.target.closest("#searchButton");
    if (target) {
      let searchInput = sideBar.querySelector("#search");
      searchInput.classList.toggle("hidden");
      const abortSignal = new AbortController();

      if (!searchInput.classList.contains("hidden")) {
        searchInput.focus();
        searchInput.addEventListener("input", () => {
          let searchValue = searchInput.value;
          let searchResults = projectsList.searchItems(searchValue);
          console.log(searchResults);
          displayItems(searchResults);
        },{signal: abortSignal.signal});
      }else{
        abortSignal.abort();
      }
    }

    //today button functionality
    //displaying the items that are for today
    target = e.target.closest("#todayButton");
    if (target) {
      let todayItems = projectsList.forTodayItemsArray();
      displayItems(todayItems);
    }

    target = e.target.closest("#allButton");
    if (target) {
      let allItems = projectsList.getAllItemsArray();
      displayItems(allItems);
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
