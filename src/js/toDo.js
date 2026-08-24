import { renderNewTasks } from "./render.js";

class ToDo {
    constructor(title,notes,duedate,priority) {
        this.title = title;
        this.notes = notes;
        this.duedate = duedate;
        this.priority = priority;
    }
}

export const ToDoLists = {
    "To-Do": [],
};

export function createToDoArray(projectName,title,description,duedate,priority) {
    
    const todo = new ToDo(title,description,duedate,priority); 
    ToDoLists[projectName].push(todo);
    console.log(ToDoLists[projectName]);
    renderNewTasks(ToDoLists[projectName].at(-1));
}

window.ToDoLists = ToDoLists;

export function createProject (projectName) {
    ToDoLists[projectName] = [];
}

export function deleteProject (name) {
    delete ToDoLists[name];
}