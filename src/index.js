import "normalize.css";
import "./style.css";
import { sideBarEvents } from "./moudles/domSideBarEvents.js";
import {createProjectList } from "./moudles/projectCreate.js";
import {toDoItemsClickEvents} from "./moudles/domToDoItem.js"
import{saveProjectListToLocalStorage, loadProjectListFromLocalStorage, extractDataFromLastProjectList} from "./moudles/localStorageFunctions.js"
import { screenUpdate } from "./moudles/screenController.js";


let projectList = createProjectList("lots of projects");
let lastProjectList = loadProjectListFromLocalStorage(projectList);
if(lastProjectList){
    projectList = extractDataFromLastProjectList(lastProjectList);
    screenUpdate(projectList);
}


sideBarEvents(projectList);
toDoItemsClickEvents(projectList);

//save project list to local storage before
window.addEventListener("beforeunload", () => {
    saveProjectListToLocalStorage(projectList);
});


