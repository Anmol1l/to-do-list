import { createToDoArray,createProject } from "./toDo.js";


export function openTaskDialog() {
    const addTask = document.querySelector('.open-dialog-Btn');
    const openDialog = document.querySelector('.add-task-dialog')
    addTask.addEventListener('click', () => {
        openDialog.showModal();
    })
}
openTaskDialog();

export function addTask() {
    const addTaskBtn = document.querySelector('#add-task');
    addTaskBtn.addEventListener('click', (event) => {
        event.preventDefault();
        createToDo();
    })
}
addTask();


export function createToDo() {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const duedate = document.querySelector('#date').value;
    const priority = document.querySelector('#priority').value;

    createToDoArray(title, description, duedate, priority)
}

export function openProjectDialog() {
    const addProject = document.querySelector('.open-project-dialog');
    const openDialog = document.querySelector('.add-project-dialog')
    addProject.addEventListener('click', () => {
        openDialog.showModal();
    })
}
openProjectDialog();

function addProject() {
    const addProjectBtn = document.querySelector('.add-project-Btn');
    addProjectBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const projectForm = document.querySelector('.project-form')
        const dialog = document.querySelector('.add-project-dialog');
        const projectName = document.querySelector('#project').value;
        const projectColor = document.querySelector('#color').value;

        const projectList = document.querySelector('.projects ul');
        const listItem = document.createElement('li');

        if (projectForm.reportValidity()) {
            createProject(projectName);
            listItem.classList.add('new-project');
            listItem.textContent = projectName;
            setProjectColor(listItem, projectColor)

            projectList.appendChild(listItem);
            projectForm.reset();
            dialog.close();
        }

    })
}
addProject();

function setProjectColor(item, projectColor) {
    item.style.setProperty('--project-color', projectColor);
}
