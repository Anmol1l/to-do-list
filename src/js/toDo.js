import { renderExpandedTask, renderProjects } from "./render.js";
import { selectProject } from "./dom.js";


class ToDo {
    constructor(title, description, duedate, priority, id) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        this.id = crypto.randomUUID();
    }

    changeTitle(text) {
        this.title = text;
    }

    changeDescription(text) {
        this.description = text;
    }

    changeDuedate(text) {
        this.duedate = text;
    }

    changePriority(text) {
        this.priority = text;
    }

}

export const ToDoLists = {
    "To-Do": [],
};

export function createToDoArray(projectName, title, description, duedate, priority) {

    const todo = new ToDo(title, description, duedate, priority);
    ToDoLists[projectName].push(todo);
    console.log(ToDoLists[projectName]);
    // console.log(ToDoLists[projectName][0]);
    renderExpandedTask(ToDoLists[projectName].at(-1));
    updateLocalStorage(ToDoLists);

}

window.ToDoLists = ToDoLists;

export function createProject(projectName) {
    ToDoLists[projectName] = [];
    updateLocalStorage(ToDoLists);
}

export function deleteProject(name) {
    delete ToDoLists[name];
    updateLocalStorage(ToDoLists);
}

function findArrayIndex(taskId, array) {
    const index = array.find(element => element.id == taskId);
    return index;
}

export function deleteTaskInArray(projectName, task) {
    const index = findArrayIndex(task.dataset.id, ToDoLists[projectName]);
    ToDoLists[projectName].splice(index, 1);
    updateLocalStorage(ToDoLists);
}

export function editToDo(task, title, description, priority, date) {

    task.changeTitle(title);
    task.changeDescription(description);
    task.changePriority(priority);
    task.changeDuedate(date);
    updateLocalStorage(ToDoLists);
}

function updateLocalStorage(ToDoLists) {
    localStorage.setItem('data', JSON.stringify(ToDoLists));
}

function fetchStorage() {
    const storedData = localStorage.getItem('data');
    const data = JSON.parse(storedData);
    return data;
}

window.fetchStorage = fetchStorage;

function populateWithLocalStorage() {
    const data = fetchStorage();
    const projects = Object.keys(data);
    console.log(projects);

    for (const project of projects) {

        if (project == 'To-Do') {
            continue;
        }
        createProject(project);
        renderProjects(project, 'red');
        selectProject();
    }


}
window.populateWithLocalStorage = populateWithLocalStorage;
