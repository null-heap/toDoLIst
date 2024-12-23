export { sideBarEvents };
import { createProject, createProjectList } from "./projectCreate.js";
import { Item } from "./itemClass.js";

//first option

//event delegation through function
// function addGlobalEventListener(type, closest, callback){
//     document.addEventListener(type, e =>{
//         let target = e.target;
//         //even if its child is pressed it will change to the appropriate target through closest.
//         if(target.closest(closest)){
//             target = target.closest(closest);
//             callback(target);
//         }
//     });
// }

// addGlobalEventListener('click','#sideBarTop button', (e) =>{
//     e.parentNode.classList.toggle("rotate");
//     let sideBar = document.querySelector('nav');
//     sideBar.classList.toggle("close");
// });

//

//second option.
//event delegation
//sideBar click events through closest pattern

// let project = createProject("my");
// projectList.addProject(project);

// let toDoItem = new Item("fd", "fdfd", "000", "fdfd", ".");
// console.log(toDoItem);

// project.addItem(toDoItem);

// console.log(project.list[0]);
// console.log(project.removeItem("fds"));
// console.log(project.list);

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

    //add task dialog behavior

    target = e.target.matches("#addTaskDialogAdd");
    if (target) {
      //reading the values from the form and storing them
      let formInputValues = sideBar.querySelectorAll("#addTaskForm input");
      //makeing an object from all the form inputs
      formInputValues = Array.from(formInputValues).reduce(
        (acc, input) => ({
          ...acc,
          [input.id.toLowerCase()]: input.value,
        }),
        {}
      );

      let formDescriptionValue = sideBar.querySelector(
        "#addTaskForm textarea"
      ).value;
      let formSelectValues = sideBar.querySelectorAll("#addTaskForm select");
      console.log(`form select value ${formSelectValues}`);
      console.table(formSelectValues[0].value);

      console.log("form VAlues = ");
      console.table(formInputValues);
      addItemFromDom(
        projectsList,
        formInputValues["project-choice"],
        formInputValues["taskname"],
        formDescriptionValue,
        formSelectValues[0].value,
        formInputValues["fortoday"],
        formInputValues["duedate"],
        formSelectValues[1].value,
        formInputValues["notes"]
      );
      console.log(projectsList);
      //for testing..., it should be done from screen Update function.
      addTaskDialogUpdateDataList(projectsList);
    }
  });
}

function addItemFromDom(
  projectsList,
  projectName,
  itemTitle,
  description,
  priority,
  forToday,
  dueDate,
  status,
  notes
) {
  let project = projectsList.findProjectByName(projectName);
  let newItem = new Item(itemTitle, description, dueDate, priority, notes);
  //the function for forToday and status are separated to update screen there own functions.
  newItem.forToday = forToday;
  newItem.status = status;

  //check if project already exists if not create one, and add item
  if (project) {
    project.addItem(newItem);
  } else {
    project = createProject(projectName);
    projectsList.addProject(project);
    project.addItem(newItem);

    //datalist function
  }
}

function updateDataList(element, arr) {
  arr.forEach((value) => {
    let newOption = document.createElement("option");
    newOption.value = value;
    element.appendChild(newOption);
  });
}

function addTaskDialogUpdateDataList(projectList) {
  let element = document.querySelector("#project-choice-list");
  let nameList = projectList.getProjectNameArray();
  updateDataList(element, nameList);
}
