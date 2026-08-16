class ToDo {
    constructor(title,notes,duedate,priority) {
        this.title = title;
        this.notes = notes;
        this.duedate = duedate;
        this.priority = priority;
    }
}

const toDoList = [];

export default function createToDo() {
    const title = prompt("Enter Title");
    const notes = prompt("Enter Note");
    const duedate = new Date().toLocaleDateString();
    const priority = prompt("Enter Priority");

    const todo = new ToDo(title,notes,duedate,priority); 
    toDoList.push(todo);
    console.log(toDoList);
}
window.createToDo = createToDo;