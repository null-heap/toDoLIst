export { formInputsToObject, getCheckedRadioInput, preFillFormFromItem, clearForm };

function formInputsToObject(formElement) {
  //supports multiple text's, select's input's, date's, textArea's, checkbox's, one radio group.
  let formTextInputs = formElement.querySelectorAll("input[type='Text']");

  let formSelectInputs = formElement.querySelectorAll("select");

  let formDateInputs = formElement.querySelectorAll("input[type='date']");

  let formTextAreaInputs = formElement.querySelectorAll("textarea");

  //if not selected its going to be null// handled by the if functions below...
  let formRadioInputs = formElement.querySelectorAll("input[type='radio']");

  let formCheckboxInputs = formElement.querySelectorAll(
    "input[type='checkbox']"
  );

  //converts a node list to normal object and make it easier to access the object properties by naming them by there id
  formTextInputs = standardNodeList(formTextInputs);
  formSelectInputs = standardNodeList(formSelectInputs);
  formDateInputs = standardNodeList(formDateInputs);
  formTextAreaInputs = standardNodeList(formTextAreaInputs);
  formRadioInputs = standardNodeList(formRadioInputs);
  formCheckboxInputs = standardNodeList(formCheckboxInputs);

  let formInputElements = {
    textInputs: { ...formTextInputs },
    selectInputs: { ...formSelectInputs },
    dateInputs: { ...formDateInputs },
    textAreaInputs: { ...formTextAreaInputs },
    radioInputs: { ...formRadioInputs },
    checkBoxInputs: { ...formCheckboxInputs },
  };

  return formInputElements;
}

//converts a node list to normal object and make it easier to access the object properties by naming them by there id
function standardNodeList(nodeList) {
  let newObject = {};

  nodeList.forEach((element) => {
    newObject = {
      ...newObject,
      [element.id]: element,
    };
  });

  return newObject;
}

function getCheckedRadioInput(radioInputs) {
  let checkedInput;
  

  if (radioInputs) {
    let inputArray = Object.entries(radioInputs);
    checkedInput = inputArray.find((e) => e[1].checked);

    
    if (checkedInput) {
        checkedInput = checkedInput[1];
      //making a standard value form the add task dialog
      if (checkedInput.id.length > 5) {
        checkedInput = {
          id: "radioInput",
          value: +checkedInput.id.slice(-1),
          element: checkedInput,
        };
      } else {
        checkedInput = {
          id: "radioInput",
          value: checkedInput.id.toLowerCase(),
          element: checkedInput,
        };
      }
    } else {
      checkedInput = {
        id: "radioInput",
        value: 0,
      };
    }
  }
  return checkedInput;
}


function preFillFormFromItem(taskForm, toDoItem, projectsList){
  let formInputs = formInputsToObject(taskForm);

  
  formInputs.textInputs['project-choice'].value = projectsList.findProjectNameByItemId(toDoItem.id);

  formInputs.textInputs['TaskName'].value = toDoItem.title;

  formInputs.textAreaInputs['description'].value = toDoItem.description;

  if(toDoItem.priority != 0){
      formInputs.radioInputs['priority' + toDoItem.priority].checked = true;
  }

  formInputs.checkBoxInputs['forToday'].checked = toDoItem.forToday;

  formInputs.dateInputs['dueDate'].value = toDoItem.dueDate;

  formInputs.selectInputs['status'].value = toDoItem.status;
  
  formInputs.textInputs['notes'].value = toDoItem.notes;
}


function clearForm(taskForm){
  let formObject = formInputsToObject(taskForm);

  let formArray = Object.entries(formObject);
  formArray.map((inputsObject) =>{
      let inputs = Object.entries(inputsObject[1]);
      inputs.map((element) => {
          let input = element[1];
          if(input.type == 'radio' || input.type == 'checkbox'){
              input.checked = false;
          }else{
              input.value = "";
          }
      });
  });
  //clear the last itemId if exists, i might should've just made a generic form attribute cleaner... as better practice
  if(taskForm.hasAttribute('data-item-id')){
    taskForm.removeAttribute('data-item-id');
  }

}
