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

    //add task dialog inside add button behavior

    target = e.target.matches("#addTaskDialogAdd");
    if (target) {
      //reading the values from the form and storing them

      let addTaskForm = sideBar.querySelector("#addTaskForm");
      let formArray = formInputsToArray(addTaskForm);
      console.table(formArray);
      addItemFromDom(
        projectsList,
        formArray[0].value,
        formArray[1].value,
        formArray[6].value,
        formArray[3].value,
        formArray[5].value,
        formArray[7].value,
        formArray[4].value,
        formArray[2].value
      );
      console.log(projectsList);

      //updating the DOM Values...
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
    if(target){

    }

  });
}

function subMenuAddButton(ulElement){
    //opening the sub menu if not open


    //add a list item
    
    
    //inside the list item there is a input element


    //

}

function screenUpdate(projectsList){

    //updating the project names in select elements
    let dataListElement = document.querySelector("#project-choice-list");
    addTaskDialogUpdateDataList(projectsList, dataListElement);

    //update project sidebar submenu
    updateProjectSubMenuInDom(projectsList);

}

function updateProjectSubMenuInDom(projectsList){
    let subMenu = document.querySelector('#projectsSubMenu > div');
    subMenu.innerText = "";
    let list = projectsList.list;
    list.forEach(project =>{
        let newLi = document.createElement('li');
        let newSpan = document.createElement('span');
        newSpan.innerText = project.projectName;
        newLi.appendChild(newSpan);
        let newNumberSpan = document.createElement('span');
        newNumberSpan.classList.toggle('numberCount');
        newNumberSpan.innerText = "    " + project.list.length;
        newLi.appendChild(newNumberSpan);
        subMenu.appendChild(newLi);
    });
}

function formInputsToArray(formElement) {
        //supports multiple text and select inputs, one date, one textArea, one radio, one checkbox
  let formTextInputs = formElement.querySelectorAll("input[type='Text']");
  formTextInputs = Array.from(formTextInputs);

  let formSelectInputs = formElement.querySelectorAll("select");
  formSelectInputs = Array.from(formSelectInputs);

  let formDateInput = formElement.querySelector("input[type='date']");

  let formTextAreaInput = formElement.querySelector("textarea");

  //if not selected its going to be null// handled by the if functions below...
  let formRadioInput = formElement.querySelector("input[type='radio']:checked");

  let formCheckboxInput = formElement.querySelector(
    "input[type='checkbox']:checked"
  );

  //handling the values of radio button and checkbox to create unified handling of values.
  if (formRadioInput) {
    formRadioInput = {
      id: "radioInput",
      value: formRadioInput.id.toLowerCase(),
    };
  } else {
    formRadioInput = {
      id: "radioInput",
      value: 0,
    };
  }

  if (formCheckboxInput) {
    formCheckboxInput = {
      id: "checkboxInput",
      value: 1,
    };
  } else {
    formCheckboxInput = {
      id: "checkboxInput",
      value: 0,
    };
  }

  let formInputElements = formTextInputs.concat(
    formRadioInput,
    formSelectInputs,
    formCheckboxInput,
    formTextAreaInput,
    formDateInput
  );
  console.table(formInputElements);
  return formInputElements;
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
  let newItem = new Item(itemTitle, description, dueDate, priority, notes, status);
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
}

function updateDataList(element, arr) {

    element.innerText = "";
  arr.forEach((value) => {
    let newOption = document.createElement("option");
    newOption.value = value;
    element.appendChild(newOption);
  });
}

function addTaskDialogUpdateDataList(projectList, element) {
  let nameList = projectList.getProjectNameArray();
  updateDataList(element, nameList);
}
