class ToDo {
    constructor(title,notes,duedate,priority) {
        this.title = title;
        this.notes = notes;
        this.duedate = duedate;
        this.priority = priority;
    }
}

const toDoList = [];

export function createToDoArray(title,description,duedate,priority) {
    
    const todo = new ToDo(title,description,duedate,priority); 
    toDoList.push(todo);
    console.log(toDoList);
}