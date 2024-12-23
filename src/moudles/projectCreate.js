export {createProject, createProjectList}


function createProject(name){
    const projectName = name.toLowerCase();
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

    const findItemByName = (itemTitle) =>{
        return list.find(((e) => e.title == itemTitle.toLowerCase()));
    }

    return {projectName, list, addItem, removeItem, findItemByName}
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

    const findProjectByName = (projectName) =>{
        return list.find(((e) => e.projectName == projectName.toLowerCase()));
    }

    const getProjectNameArray = () =>{
        let nameArray = [];
        list.forEach(project =>{
            nameArray.push(project.projectName);
        });
        return nameArray;
    };

    return {ListName, list, addProject, removeProject, findProjectByName, getProjectNameArray};
}
