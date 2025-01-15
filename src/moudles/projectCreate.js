export { createProject, createProjectList };
import { isPast } from "date-fns";

function createProject(name) {
  const projectName = name.toLowerCase();
  let list = [];
  const addItem = (item) => {
    list.push(item);
  };
  const removeItemByName = (title) => {
    let index;
    let remove = list.find((value, indx) => {
      index = indx;
      return value.title.toLowerCase() == title.toLowerCase();
    });

    if (remove != undefined) {
      list.splice(index, 1);
    }
  };

  const removeItemById = (itemId) => {
    let index;
    let remove = list.find((value, indx) => {
      index = indx;
      return value.id == itemId;
    });

    if (remove != undefined) {
      list.splice(index, 1);
      return true;
    } else {
      return false;
    }
  };

  const findItemByName = (itemTitle) => {
    return list.find((e) => e.title == itemTitle.toLowerCase());
  };

  const findItemById = (itemId) => {
    return list.find((e) => e.id == itemId);
  };

  const forTodayItemsArray = () => {
    let itemArray = [];
    list.forEach((item) => {
      if (item.forToday) {
        itemArray.push(item);
      }
    });
    return itemArray;
  };

  const pastDueDateItemsArray = () => {
    let itemArray = [];
    list.forEach((item) => {
      // in the case of past due date and not completed
      if (item.dueDate && isPast(item.dueDate) && !item.status) {
        itemArray.push(item);
      }
    });
    return itemArray;
  };

  return {
    projectName,
    list,
    addItem,
    removeItemByName,
    findItemByName,
    findItemById,
    removeItemById,
    forTodayItemsArray,
    pastDueDateItemsArray,
  };
}

function createProjectList(name) {
  const ListName = name;
  let list = [];

  const addProject = (project) => {
    list.push(project);
  };

  const removeProject = (name) => {
    let index;
    let remove = list.find((value, indx) => {
      index = indx;

      return (value.projectName.toLowerCase()) == (name.toLowerCase());
    });

    if (remove != undefined) {
      list.splice(index, 1);
    }
  };

  const findProjectByName = (projectName) => {
    return list.find((e) => e.projectName == projectName.toLowerCase());
  };

  const getProjectNameArray = () => {
    let nameArray = [];
    list.forEach((project) => {
      nameArray.push(project.projectName);
    });
    return nameArray;
  };

  const findItemById = (itemId) => {
    let item;
    list.find((project) => {
      item = project.findItemById(itemId);
      return item;
    });

    return item;
  };

  //delete item by id...

  const deleteItemById = (itemId) => {
    return list.find((project) => project.removeItemById(itemId));
  };

  //find project name by item Id

  const findProjectNameByItemId = (itemId) => {
    let project = list.find((project) => project.findItemById(itemId));
    return project.projectName;
  };

  const forTodayItemsArray = () => {
    let itemArray = [];
    list.forEach((project) => {
      let array = project.forTodayItemsArray();

      if (array && array.length) {
        itemArray.push(...array);
      }
    });
    if (itemArray && itemArray.length) {
      return itemArray;
    } else {
      return false;
    }
  };

  const pastDueDateItemsArray = () => {
    let itemArray = [];
    list.forEach((project) => {
      let array = project.pastDueDateItemsArray();

      if (array && array.length) {
        itemArray.push(...array);
      }
    });

    if (itemArray && itemArray.length) {
      return itemArray;
    } else {
      return false;
    }
  };

  const getAllItemsArray = () => {
    let itemArray = [];
    list.forEach((project) => {
      itemArray.push(...project.list);
    });

    return itemArray;
};

const searchItems = (searchValue) => {
  let itemArray = [];
  if(searchValue == ""){
    return itemArray;
  }
  list.forEach((project) => {
    let array = project.list.filter((item) => {
      return item.title.toLowerCase().includes(searchValue.toLowerCase()) || item.id == +searchValue;
    });

    if (array && array.length) {
      itemArray.push(...array);
    }
  });
  return itemArray;
};

  return {
    ListName,
    list,
    addProject,
    removeProject,
    findProjectByName,
    getProjectNameArray,
    findItemById,
    deleteItemById,
    findProjectNameByItemId,
    forTodayItemsArray,
    pastDueDateItemsArray,
    getAllItemsArray,
    searchItems,
  };
}
