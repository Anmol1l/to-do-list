import { renderExpandedTask, renderProjects } from "./render.js";


class ToDo {
    constructor(title, description, duedate, priority, status, id) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        this.status = status;
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
    changeStatus(status) {
        this.status = status;
    }

}

export const ToDoLists = {
    "To-Do": { array: [], color: '#f55656' },
};

export function createToDoArray(projectName, title, description, duedate, priority, status) {

    const todo = new ToDo(title, description, duedate, priority, status);
    ToDoLists[projectName].array.push(todo);
    // console.log(ToDoLists[projectName].array);
    // console.log(ToDoLists[projectName][0]);
    renderExpandedTask(ToDoLists[projectName].array.at(-1));
    updateLocalStorage(ToDoLists);

}

window.ToDoLists = ToDoLists;

export function createProject(projectName, projectColor) {
    ToDoLists[projectName] = { array: [], color: projectColor };
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
    const index = findArrayIndex(task.dataset.id, ToDoLists[projectName].array);
    ToDoLists[projectName].array.splice(index, 1);
    updateLocalStorage(ToDoLists);
}

export function editToDo(task, title, description, priority, date) {

    task.changeTitle(title);
    task.changeDescription(description);
    task.changePriority(priority);
    task.changeDuedate(date);
    updateLocalStorage(ToDoLists);
}

export function editStatus(task, status) {
    task.changeStatus(status);
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

export function populateWithLocalStorage() {
    const data = fetchStorage();
    const projects = Object.keys(data);
    console.log(data);

    for (const project of projects) {

        if (project == 'To-Do') {
            for (const element of data[project].array) {
                populateTasks(project, element);
            }
            continue;
        }
        createProject(project, data[project].color);
        renderProjects(project, data[project].color);
        for (const element of data[project].array) {
            populateTasks(project, element);
        }
        console.log(data[project].array[0]);
    }
}

function populateTasks(project, value) {

    const title = value.title;
    const description = value.description;
    const duedate = value.duedate;
    const priority = value.priority;
    const status = value.status;
    const todo = new ToDo(title, description, duedate, priority, status);
    ToDoLists[project].array.push(todo);

}

if (localStorage.length > 0) {
    populateWithLocalStorage();
}
window.populateWithLocalStorage = populateWithLocalStorage;
