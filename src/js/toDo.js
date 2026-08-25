import { renderNewTasks } from "./render.js";

class ToDo {
    constructor(title, description, duedate, priority, id) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        this.id = crypto.randomUUID();
    }
}

export const ToDoLists = {
    "To-Do": [],
};

export function createToDoArray(projectName, title, description, duedate, priority) {

    const todo = new ToDo(title, description, duedate, priority);
    ToDoLists[projectName].push(todo);
    console.log(ToDoLists[projectName]);
    renderNewTasks(ToDoLists[projectName].at(-1));
}

window.ToDoLists = ToDoLists;

export function createProject(projectName) {
    ToDoLists[projectName] = [];
}

export function deleteProject(name) {
    delete ToDoLists[name];
}

function findArrayIndex(taskId,array) {
    const index = array.find(element => element.id == taskId);
    return index;
}

export function deleteTaskInArray(projectName, task) {
    const index = findArrayIndex(task.dataset.id,ToDoLists[projectName]);
    ToDoLists[projectName].splice(index, 1);
}