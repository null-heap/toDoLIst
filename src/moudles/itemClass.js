export {Item};












console.log("I work!!!");

//toDo item object constructor

function Item(title, description, dueDate, priority, notes, status) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.notes = notes;
      this.forToday = 0;
      this.status = status;
    }

















    
///create full toDo item/ add the modules to the object/ the facade pattern
function toDoOperation(item) {
  {
    console.log("test");
    
    return {};
  }
}
// let hi = createToDoItem("ahd", "dshfasdf", "dd", "0", "ffff");
// console.log(hi.toDoItem.fullTitle);
//used a class with private vars for now, might simplify it later on.
// class Item {


//   #title;
//   #description;
//   #dueDate;
//   #priority;
//   #notes;
  
//   constructor(title, description, dueDate, priority, notes) {
//     this.#title = title;
//     this.#description = description;
//     this.#dueDate = dueDate;
//     this.#priority = priority;
//     this.#notes = notes;
//     this.complete = 0;
//   }

//   get title(){
//     return this.#title;
//   }
//   get description(){
//     return this.#description;
//   }
//   get dueDate(){
//     return this.#dueDate;
//   }
//   get priority(){
//     return this.#priority;
//   }
//   get notes(){
//     return this.#notes;
//   }

//   set title(s){
//     this.#title = s;
//   }
  
//   set description(s){
//     this.#description = s;
//   }
//   set dueDate(s){
//     this.#dueDate = s;
//   }
//   set priority(s){
//     this.#priority = s;
//   }
//   set notes(s){
//     this.#notes = s;
//   }
// }
