export { createToDoItemAsElement };

function createToDoItemAsElement(toDoItem) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("toDoItemDiv");
  mainDiv.dataset.itemId = toDoItem.id;
  //
  let startDiv = document.createElement('div');
  startDiv.classList.add('startDiv');
  //
  let nameDiv = document.createElement('div');
  nameDiv.classList.add('textDiv');
  let nameTitle = document.createElement("span");
  nameTitle.innerText = "Name:";

  let nameSpan = document.createElement("span");
  nameSpan.innerText = toDoItem.title;

  nameDiv.append(nameTitle,nameSpan);
  //

  let dueDateDiv = document.createElement('div');
  dueDateDiv.classList.add('textDiv');

  let dueDateTitle = document.createElement("span");
  dueDateTitle.innerText = "Due-Date:";

  let dueDateSpan = document.createElement("span");
  dueDateSpan.innerText = toDoItem.dueDate;
  
  dueDateDiv.append(dueDateTitle, dueDateSpan);
  //
  let notesDiv = document.createElement('div');
    notesDiv.classList.add('textDiv');

  let notesTitle = document.createElement('span');
  notesTitle.innerText = "Notes:";
  let notesSpan = document.createElement("span");
  notesSpan.innerText = toDoItem.notes;
  notesDiv.append(notesTitle, notesSpan);
  //
  let rightButton = document.createElement("button");
  rightButton.classList.toggle('rightButton');
  //
  let rightDiv = document.createElement("div");
  rightDiv.classList.add("rightDiv");
  //

  let descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('textDiv', 'descriptionDiv');

  let descriptionTitle = document.createElement('span');
  descriptionTitle.innerText = "Description:";
  let descriptionP = document.createElement("p");
  descriptionP.innerText = toDoItem.description;
  descriptionP.classList.add('descriptionSpan');
  descriptionDiv.append(descriptionTitle,descriptionP);
  //
  let bottomButton = document.createElement("button");
  bottomButton.classList.toggle('bottomButton');
  //
  let bottomDiv = document.createElement("div");
  bottomDiv.classList.add("bottomDiv");
  //
  let todayCheckBoxDiv = document.createElement('div');
  todayCheckBoxDiv.classList.add('textDiv');

  let todayCheckBoxTitle = document.createElement('span');
  todayCheckBoxTitle.innerText = "Today?:";
  let todayCheckBox = document.createElement("input");
  todayCheckBox.type = "checkbox";
  todayCheckBox.classList.add("todayCheckBox");
  todayCheckBox.checked = toDoItem.forToday;
  todayCheckBoxDiv.append(todayCheckBoxTitle,todayCheckBox);
  //
  let completeCheckBoxDiv = document.createElement('div');
  completeCheckBoxDiv.classList.add('textDiv');

  let completeCheckBoxTitle = document.createElement('span');
  completeCheckBoxTitle.innerText = "Complete?:"
  let completeCheckBox = document.createElement("input");
  completeCheckBox.type = "checkbox";
  completeCheckBox.classList.add("completeCheckBox");
  if (toDoItem.status == "completed") {
    completeCheckBox.checked = true;
  }
  completeCheckBoxDiv.append(completeCheckBoxTitle, completeCheckBox);
  //



  //
  let topDiv = document.createElement('div');
  topDiv.classList.add('topDiv');
  topDiv.classList.toggle('hide');

  let idSpan = document.createElement('span');
  idSpan.innerText = "Item Id: " + toDoItem.id;

  //can also add father project name

  let editButton = document.createElement('button');
  editButton.classList.add('editButton');

  let deleteButton = document.createElement('button');
  deleteButton.classList.add('deleteButton');

  

  topDiv.append(idSpan,editButton,deleteButton);



  startDiv.append(nameDiv, dueDateDiv, notesDiv)

  mainDiv.append(topDiv,startDiv,rightDiv, rightButton,bottomDiv, bottomButton)

  rightDiv.appendChild(descriptionDiv);


  bottomDiv.append(todayCheckBoxDiv, completeCheckBoxDiv);


  startDiv.classList.toggle('bottomCollapse')
  bottomDiv.classList.toggle('hide');
  startDiv.classList.toggle('rightCollapse')
  rightDiv.classList.toggle('hide');
  //set border by priority...
  mainDiv = setBorderByPriority(mainDiv, toDoItem.priority);
  return mainDiv;
}

function setBorderByPriority(div, priority) {

  switch (priority) {
    case 1:
      div.style.borderTop = "4px solid red";
      break;

    case 2:                                    
      div.style.borderTop = "4px solid darkorange";
      break;

    case 3:
      div.style.borderTop = "4px solid darkblue";
      break;

    case 4:
      div.style.borderTop = "4px solid darkgreen";
      break;

    default:
      break;
  }

  return div;
}

toDoItemsClickEvents();

function toDoItemsClickEvents(){

    let mainDiv = document.querySelector('#main');

    mainDiv.addEventListener('click', (e) =>{
        let target;



        target = e.target.matches('button.bottomButton');
        if(target){
            //getting the toDoItemDiv and extracting its child...

            let toDoItemDiv = e.target.parentNode;
            let startDiv = toDoItemDiv.querySelector('.startDiv');
            startDiv.classList.toggle('bottomCollapse')
            let bottomDiv = toDoItemDiv.querySelector('.bottomDiv');
            bottomDiv.classList.toggle('hide');
        }

        target = e.target.matches('button.rightButton');
        if(target){
            //getting the toDoItemDiv and extracting its child...

            let toDoItemDiv = e.target.parentNode;
            let startDiv = toDoItemDiv.querySelector('.startDiv');
            startDiv.classList.toggle('rightCollapse')
            let rightDiv = toDoItemDiv.querySelector('.rightDiv');
            rightDiv.classList.toggle('hide');

            let topDiv = toDoItemDiv.querySelector('.topDiv');
            topDiv.classList.toggle('hide');
        }


    });
}
