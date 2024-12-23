import "normalize.css";
import "./style.css";
import completeDoToItem from "./moudles/setToDoComplete.js";
import changeToDoPriority from "./moudles/changeToDoPriority.js";
// import {createProject, createProjectList } from "./moudles/projectCreate.js";
import { sideBarEvents } from "./moudles/domSideBarEvents.js";

import { createProject, createProjectList } from "./moudles/projectCreate.js";
import { Item } from "./moudles/itemClass.js";


let projectList = createProjectList("lots of projects");
sideBarEvents(projectList);

