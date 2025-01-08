export { sideBarEvents };
import { createProject, createProjectList } from "./projectCreate.js";
import { Item } from "./itemClass.js";
import { createToDoItemAsElement } from "./domToDoItem.js";
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
      addItemFromDom(projectsList, addTaskForm);
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

function screenUpdate(projectsList) {
  //updating the project names in select elements
  let dataListElement = document.querySelector("#project-choice-list");
  addTaskDialogUpdateDataList(projectsList, dataListElement);

  //update project sidebar submenu
  updateProjectSubMenuInDom(projectsList);
}

function updateProjectSubMenuInDom(projectsList) {
  let subMenu = document.querySelector("#projectsSubMenu > div");
  subMenu.innerText = "";
  let list = projectsList.list;
  list.forEach((project) => {
    let newLi = document.createElement("li");
    let newButton = document.createElement("button");
    // newButton.classList.add('buttonStyle');

    let newSpan = document.createElement("span");
    newSpan.innerText = project.projectName;
    newButton.appendChild(newSpan);
    newLi.appendChild(newButton);

    let newNumberSpan = document.createElement("span");
    newNumberSpan.classList.toggle("numberCount");
    newNumberSpan.innerText = "    " + project.list.length;
    newLi.appendChild(newNumberSpan);

    subMenu.appendChild(newLi);
  });
}

function formInputsToArray(formElement) {
  //supports multiple text and select inputs, one date, one textArea, one radio, one checkbox
  let formTextInputs = formElement.querySelectorAll("input[type='Text']");
  console.log("sfsdfsdfsdf");
  console.log(formTextInputs);
  formTextInputs = Array.from(formTextInputs);
  console.log(formTextInputs);
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
    //making a standard value form the add task dialog
    if (formRadioInput.id.length > 5) {
      formRadioInput = {
        id: "radioInput",
        value: +formRadioInput.id.slice(-1),
      };
    } else {
      formRadioInput = {
        id: "radioInput",
        value: formRadioInput.id.toLowerCase(),
      };
    }
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

//return an object that is values contain node list for the type of inputs...
function formInputsToObject(formElement) {
  //supports multiple text's, select's input's, date's, textArea's, checkbox's, one radio group.
  let formTextInputs = formElement.querySelectorAll("input[type='Text']");

  let formSelectInputs = formElement.querySelectorAll("select");

  let formDateInputs = formElement.querySelectorAll("input[type='date']");

  let formTextAreaInputs = formElement.querySelectorAll("textarea");

  //if not selected its going to be null// handled by the if functions below...
  let formRadioInputs = formElement.querySelectorAll("input[type='radio']");

  let formCheckboxInputs = formElement.querySelectorAll(
    "input[type='checkbox']"
  );


  //converts a node list to normal object and make it easier to access the object properties by naming them by there id
  formTextInputs = standardNodeList(formTextInputs);
  formSelectInputs = standardNodeList(formSelectInputs);
  formDateInputs = standardNodeList(formDateInputs);
  formTextAreaInputs = standardNodeList(formTextAreaInputs);
  formRadioInputs = standardNodeList(formRadioInputs);
  formCheckboxInputs = standardNodeList(formCheckboxInputs);

  let formInputElements = {
    textInputs: { ...formTextInputs },
    selectInputs: { ...formSelectInputs },
    dateInputs: { ...formDateInputs },
    textAreaInputs: { ...formTextAreaInputs },
    radioInputs: { ...formRadioInputs },
    checkBoxInputs: { ...formCheckboxInputs },
  };

  
  //make the elements easier to access..., by changing there object name to there id
  //i might could've done it in a cleaner way by converting to array and using map with reduce,
//   for (let key in formInputElements) {
//     let newFormInputElements = {};
//     if (formInputElements.hasOwnProperty(key)) {
//       // for(let element in formInputElements[key]){
//       //     if(formInputElements[key].hasOwnProperty(element))
//       //     {
//       //         newFormInputElements = {
//       //         ...newFormInputElements,
//       //         [formInputElements[key][element].id]: formInputElements[key][element] ,
//       //         }
//       //     }
//       // }

//       formInputElements[key] = { ...newFormInputElements };
//     }
//   }

  // let inputArray = Object.entries(formInputElements);

  // let finalObject = inputArray.map((elementObject))

  console.table(formInputElements);
  return formInputElements;
}

//converts a node list to normal object and make it easier to access the object properties by naming them by there id
function standardNodeList(nodeList) {
  let newObject = {};

  nodeList.forEach((element) => {
    newObject = {
      ...newObject,
      [element.id]: element,
    };
  });

  return newObject;
}

function getCheckedRadioInput(radioInputs) {
  let inputArray = Object.entries(radioInputs);
  let checkedInput = inputArray.find((e) => e[1].checked);

  checkedInput = checkedInput[1];

  if (checkedInput) {
    //making a standard value form the add task dialog
    if (checkedInput.id.length > 5) {
      checkedInput = {
        id: "radioInput",
        value: +checkedInput.id.slice(-1),
      };
    } else {
      checkedInput = {
        id: "radioInput",
        value: checkedInput.id.toLowerCase(),
      };
    }
  } else {
    checkedInput = {
      id: "radioInput",
      value: 0,
    };
  }
  return checkedInput;
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


  console.log('priority ===  ' + priority);

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
