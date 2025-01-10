export {createProject, createProjectList}


function createProject(name){
    const projectName = name.toLowerCase();
    let list = [];
    const addItem = (item) =>{
        list.push(item);
    }
    const removeItemByName = (title) =>{
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

    const removeItemById = (itemId) =>{
        let index;
        let remove = list.find((value, indx) =>{
            index = indx;
            return value.id == itemId
        });

        if(remove != undefined){
            list.splice(index, 1);
            return true;
        }else{
            console.log("Id not found!!");
            return false;
        }
        

    }



    const findItemByName = (itemTitle) =>{
        return list.find(((e) => e.title == itemTitle.toLowerCase()));
    }

    const findItemById = (itemId) =>{
        return list.find(((e) => e.id == itemId));
    }

    //delete item by id..

    return {projectName, list, addItem, removeItemByName, findItemByName, findItemById, removeItemById}
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


    const findItemById = (itemId) =>{
        let item;
        list.find((project) => {
          item = project.findItemById(itemId)
          return item;
        });

        return item;
    };


    //delete item by id...

    const deleteItemById = (itemId) =>{
        return list.find((project) => project.removeItemById(itemId));
    }

    //find project name by item Id

    const findProjectNameByItemId = (itemId) =>{
        let project = list.find((project) => project.findItemById(itemId));
        return project.projectName
    }



    return {ListName, list, addProject, removeProject, findProjectByName, getProjectNameArray, findItemById, deleteItemById, findProjectNameByItemId};
}
