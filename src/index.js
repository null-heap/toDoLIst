import "normalize.css";
import "./style.css";
import { sideBarEvents } from "./moudles/domSideBarEvents.js";

import {createProjectList } from "./moudles/projectCreate.js";
import {toDoItemsClickEvents} from "./moudles/domToDoItem.js"


let projectList = createProjectList("lots of projects");
sideBarEvents(projectList);
toDoItemsClickEvents(projectList);


