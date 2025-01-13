export {Item};
import {isToday} from "date-fns";

let idCount = 0;

function getId(){
  idCount++;
  return idCount;
}


class ForToday {
  constructor(forToday) {
    this._forToday = forToday ? new Date() : false;
  }

  get forToday() {
    if (this._forToday) {
      return isToday(this._forToday);
    } else {
      return false;
    }
  }

  set forToday(value) {
    if (value) {
      this._forToday = new Date();
    } else {
      this._forToday = false;
    }
  }
}

function Item(title, description, dueDate, priority, notes, status, forToday, id) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.notes = notes;
      this.forToday = new ForToday(forToday);
      this.status = status;
      this.id = id ? id : getId();
    }

