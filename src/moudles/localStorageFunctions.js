export { saveProjectListToLocalStorage, loadProjectListFromLocalStorage, extractDataFromLastProjectList };
import { createProject,createProjectList } from "./projectCreate";
import { Item } from "./itemClass";

function saveProjectListToLocalStorage(projectList) {
  localStorage.setItem('projectList', JSON.stringify(projectList));
}

function loadProjectListFromLocalStorage() {
  let lastProjectList = localStorage.getItem('projectList');
  lastProjectList = lastProjectList ? JSON.parse(lastProjectList) : null;
  return lastProjectList;
}

function extractDataFromLastProjectList(lastProjectList){
  let newProjectList = createProjectList("lots of projects");
  lastProjectList.list.forEach(project => {
      //create project object
      let newProject = createProject(project.projectName);
      //add items to the project
      project.list.forEach(item =>{
          console.log(item);
          let newItem  = new Item();
          newItem = Object.assign(newItem, item);
          //add newItem to the project
          newProject.addItem(newItem);
      });
      newProjectList.addProject(newProject);
      // add the project to new project list
  });

  return newProjectList;
}
