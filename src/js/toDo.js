class ToDo {
    constructor(title,notes,duedate,priority) {
        this.title = title;
        this.notes = notes;
        this.duedate = duedate;
        this.priority = priority;
    }
}

const ToDoLists = {
    "To-Do": [],
};

export function createToDoArray(projectName,title,description,duedate,priority) {
    
    const todo = new ToDo(title,description,duedate,priority); 
    ToDoLists[projectName].push(todo);
    console.log(ToDoLists[projectName]);
}

window.ToDoLists = ToDoLists;

export function createProject (projectName) {
    ToDoLists[projectName] = [];
}

export function deleteProject (name) {
    delete ToDoLists[name];
}