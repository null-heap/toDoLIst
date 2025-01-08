export { formInputsToObject, getCheckedRadioInput };

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

  //make the elements easier to access..., by changing there object name to there id
  //i might could've done it in a cleaner way by converting to array and using map with reduce,
  //   for (let key in formInputElements) {
  //     let newFormInputElements = {};
  //     if (formInputElements.hasOwnProperty(key)) {
  //       // for(let element in formInputElements[key]){
  //       //     if(formInputElements[key].hasOwnProperty(element))
  //       //     {
  //       //         newFormInputElements = {
  //       //         ...newFormInputElements,
  //       //         [formInputElements[key][element].id]: formInputElements[key][element] ,
  //       //         }
  //       //     }
  //       // }

  //       formInputElements[key] = { ...newFormInputElements };
  //     }
  //   }

  // let inputArray = Object.entries(formInputElements);

  // let finalObject = inputArray.map((elementObject))

  console.table(formInputElements);
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

    
    console.log("checked input!!!! = "+ checkedInput);
    if (checkedInput) {
        checkedInput = checkedInput[1];
      //making a standard value form the add task dialog
      if (checkedInput.id.length > 5) {
        checkedInput = {
          id: "radioInput",
          value: +checkedInput.id.slice(-1),
        };
      } else {
        checkedInput = {
          id: "radioInput",
          value: checkedInput.id.toLowerCase(),
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
