import {createToDoArray} from "./toDo.js";


export function openDialog() {
    const addTask = document.querySelector('.open-dialog');
    const openDialog = document.querySelector('dialog')
    addTask.addEventListener('click', () => {
        openDialog.showModal();
    })
}
openDialog();

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

    createToDoArray(title,description,duedate,priority)
}

