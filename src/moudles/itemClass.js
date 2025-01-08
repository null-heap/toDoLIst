export {Item};

let idCount = 0;

function getId(){
  idCount++;
  return idCount;
}
function Item(title, description, dueDate, priority, notes, status) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.notes = notes;
      this.forToday = 0;
      this.status = status;
      this.id = getId();
    }