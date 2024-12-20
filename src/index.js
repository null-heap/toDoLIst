import "normalize.css";
import "./style.css";
import {Item} from "./moudles/itemClass.js"
import completeDoToItem from "./moudles/setToDoComplete.js";
import changeToDoPriority from "./moudles/changeToDoPriority.js";
import {createProject, createProjectList } from "./moudles/projectCreate.js";
import { sideBarEvents } from "./moudles/domSideBarEvents.js";


sideBarEvents();

let toDoItem = new Item("fd", "fdfd", "000", "fdfd", ".");
console.log(toDoItem);

let project = createProject("myFirst Project");
project.addItem(toDoItem);

let projectList = createProjectList("lots of projects");

projectList.addProject(project);

console.log(project.list[0]);
console.log(project.removeItem("fds"));
console.log(project.list);
