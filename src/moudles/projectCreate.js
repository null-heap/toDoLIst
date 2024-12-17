export {createProject, createProjectList}


function createProject(name){
    const projectName = name;
    let list = [];
    const addItem = (item) =>{
        list.push(item);
    }
    const removeItem = (title) =>{
        let index;
        let remove = list.find((value, indx) =>{
            index = indx;
            return value.title.toLowerCase() == title.toLowerCase();
        });

        if(remove != undefined){
            list.splice(index, 1);
        }else{
            console.log("title not found!!");
        }
        

    }

    return {projectName, list, addItem, removeItem}
}


function createProjectList(name){
    const ListName = name;
    let list = [];
    const addProject = (project) =>{
        list.push(project);
    }
    const removeProject = (name) =>{
        let index;
        let remove = list.find((value, indx) =>{
            index = indx;
            return value.name.toLowerCase() == name.toLowerCase();
        });

        if(remove != undefined){
            list.splice(index, 1);
        }else{
            console.log("name not found!!");
        }
        

    }

    return {ListName, list, addProject, removeProject}
}
