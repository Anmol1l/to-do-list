import { createToDoArray } from "./toDo.js";
import { renderProjects, renderProjectName, clearProjectName } from "./render.js";


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
        createToDoInProject();

    })
}
addTask();


export function createToDo(projectName) {
    const taskForm = document.querySelector('.task-form')
    const openDialog = document.querySelector('.add-task-dialog')
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const duedate = document.querySelector('#date').value;
    const priority = document.querySelector('#priority').value;

    if (taskForm.reportValidity()) {
        createToDoArray(projectName, title, description, duedate, priority)
        taskForm.reset();
        openDialog.close();
    }
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
        renderProjects();
        const dialog = document.querySelector('.add-project-dialog');
        dialog.close();
        selectProject();
    })
}
addProject();

function selectProject() {
    const projects = document.querySelectorAll('.projects ul li');

    projects.forEach(project => {
        project.addEventListener('click', () => {
            checkSelectClass(projects);
            project.classList.add('select');
            clearProjectName();
            renderProjectName();
        })
    })
}

function checkSelectClass(projects) {
    projects.forEach(project => {
        if (project.classList.contains('select')) {
            project.classList.remove('select');
        }
    })
}

function createToDoInProject() {
    const projectContainer = document.querySelector('.select');
    const projectName = projectContainer.querySelector('#project-name').textContent;
    createToDo(projectName);
}