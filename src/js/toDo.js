class ToDo {
    constructor(title,notes,duedate,priority) {
        this.title = title;
        this.notes = notes;
        this.duedate = duedate;
        this.priority = priority;
    }
}

const ToDoLists = {
    toDo: [],
};

export function createToDoArray(title,description,duedate,priority) {
    
    const todo = new ToDo(title,description,duedate,priority); 
    ToDoLists.toDo.push(todo);
    console.log(ToDoLists.toDo);
}

window.ToDoLists = ToDoLists;

export function createProject (projectName) {
    ToDoLists[projectName] = [];
}

// createProject('hello')