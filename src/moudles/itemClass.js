export {Item};
import {isToday} from "date-fns";


let idCount = 0;

function getId(){
  idCount++;
  return idCount;
}

class Item {
  constructor(title, description, dueDate, priority, notes, status, forToday, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.status = status;
    this.id = id ? id : getId();
    this._forToday = forToday ? new Date() : null;
  }

  get forToday() {
    return this._forToday ? isToday(this._forToday) : false;
  }

  set forToday(value) {
    this._forToday = value ? new Date() : null;
  }
}
