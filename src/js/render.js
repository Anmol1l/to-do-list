import { createProject, deleteProject, deleteTaskInArray } from "./toDo.js";
import { compareAsc } from "date-fns";
import closeImg from "../images-and-icons/close.svg";
import expandImg from "../images-and-icons/expand.svg";
import editImg from "../images-and-icons/edit.svg";
import delImg from "../images-and-icons/delete.svg"

// render project section

export function renderProjects() {
    const projectForm = document.querySelector('.project-form')
    const projectName = document.querySelector('#project').value;
    const projectColor = document.querySelector('#color').value;

    const projectList = document.querySelector('.projects ul');
    const listItem = document.createElement('li');
    const div = document.createElement('div');
    const spanText = document.createElement('span');
    spanText.id = 'project-name';

    const spanImg = document.createElement('span');
    spanImg.id = 'img';
    const img = document.createElement('img');
    img.src = closeImg;
    img.alt = "close";
    spanImg.appendChild(img);

    if (projectForm.reportValidity() && projectName != 'To-Do') {
        spanText.textContent = projectName;
        div.append(spanText, spanImg);
        listItem.appendChild(div);

        createProject(projectName);
        setProjectColor(listItem, projectColor)

        projectList.appendChild(listItem);
        projectForm.reset();
    }

    spanImg.addEventListener('click', () => {
        deleteProjectRender(listItem, projectList, projectName);
    })
}

function setProjectColor(item, projectColor) {
    item.style.setProperty('--project-color', projectColor);
}

function deleteProjectRender(listItem, projectList, projectName) {
    const deleteDialog = document.querySelector('.delete-popUp');
    deleteDialog.showModal();

    const confirmText = deleteDialog.querySelector('h3');
    confirmText.textContent = `Delete ${projectName}`;
    const no = document.querySelector('#no');
    const yes = document.querySelector('#yes');

    no.addEventListener('click', () => {
        deleteDialog.close();
    }, { once: true });
    yes.addEventListener('click', () => {
        projectList.removeChild(listItem);
        deleteProject(projectName);
        deleteDialog.close();
    }, { once: true });
}

// render canvas section

function getListColor(projectContainer) {
    const listStyles = window.getComputedStyle(projectContainer, '::marker')
    const color = listStyles.getPropertyValue('color');
    return color;
}

export function renderProjectName() {
    const canvasHeading = document.querySelector('#canvas-heading');
    const heading = canvasHeading.querySelector('h1');
    const hasHeading = canvasHeading.contains(heading);

    if (!hasHeading) {
        const projectHeading = document.createElement('h1');
        const projectContainer = document.querySelector('.select');
        const projectName = projectContainer.querySelector('#project-name').textContent;
        projectHeading.textContent = projectName;
        projectHeading.style.color = getListColor(projectContainer);
        canvasHeading.appendChild(projectHeading);
        const hr = document.createElement('hr');
        canvasHeading.appendChild(hr);
    }

}
renderProjectName();

export function clearProjectName() {
    const canvasHeading = document.querySelector('#canvas-heading');
    const heading = canvasHeading.querySelector('h1');
    const hr = canvasHeading.querySelector('hr');

    canvasHeading.removeChild(heading);
    canvasHeading.removeChild(hr);
}

export function renderNewTasks(task) {

    const canvas = document.querySelector('#to-dos');

    const toDoMinimised = document.createElement('div');
    toDoMinimised.classList.add('to-do-minimised');
    toDoMinimised.dataset.id = task.id;

    const projectContainer = document.querySelector('.select');
    const projectName = projectContainer.querySelector('#project-name').textContent;

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task')
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'todo';
    input.id = 'todo';
    const label = document.createElement('label');
    label.for = 'todo';
    label.textContent = task.title;
    taskDiv.append(input, label);

    const priorityDateDiv = document.createElement('div');
    priorityDateDiv.classList.add('priority-date');
    const prioritySpan = document.createElement('span');
    prioritySpan.classList.add('priority', task.priority);
    const dateSpan = document.createElement('span');
    dateSpan.classList.add('date');
    dateSpan.textContent = task.duedate;
    checkDate(dateSpan.textContent, dateSpan);
    priorityDateDiv.append(prioritySpan, dateSpan);

    const editButtonDiv = document.createElement('div');
    editButtonDiv.classList.add('edit-buttons');
    const editSpan = document.createElement('span');
    editSpan.classList.add('edit');
    const editBtn = document.createElement('img');
    editBtn.src = editImg;
    editBtn.alt = "edit";
    editSpan.appendChild(editBtn);
    const expandSpan = document.createElement('span');
    expandSpan.classList.add('expand');
    const expandBtn = document.createElement('img');
    expandBtn.src = expandImg;
    expandBtn.alt = "expand";
    expandSpan.appendChild(expandBtn);
    const delSpan = document.createElement('span');
    delSpan.classList.add('delete');
    const delBtn = document.createElement('img');
    delBtn.src = delImg;
    delBtn.alt = "delete";
    delSpan.appendChild(delBtn);

    expandSpan.addEventListener('click', () => {
        renderExpandedTask(toDoMinimised, task);
    })

    delSpan.addEventListener('click', () => {
        deleteTask(projectName, toDoMinimised);
    })

    editButtonDiv.append(editSpan, expandSpan, delSpan)

    const hr = document.createElement('hr');

    toDoMinimised.append(taskDiv, priorityDateDiv, editButtonDiv, hr);
    canvas.appendChild(toDoMinimised)
}

export function renderAllTasks(taskArray) {
    taskArray.forEach(task => {
        renderNewTasks(task);
    });
}

window.renderAllTasks = renderAllTasks;

function checkDate(date, dateSpan) {
    const today = new Date().toISOString().split('T')[0];
    let result = compareAsc(new Date(date), new Date(today));

    if (result == 0) {
        dateSpan.textContent = "Today";
        dateSpan.style.color = "#00ac00";
    }
    else if (result == -1) {
        dateSpan.style.color = "red"
    }
    else if (result == 1) {
        dateSpan.style.color = "#ff8800"
    }
}

export function clearCanvas() {
    const canvas = document.querySelector('#to-dos');
    canvas.replaceChildren();
}

function deleteTask(projectName, task) {
    task.remove();
    deleteTaskInArray(projectName, task);
}

function renderExpandedTask(taskContainer, task) {
    taskContainer.replaceChildren();
    taskContainer.classList.remove('to-do-minimised');
    taskContainer.classList.add('to-do-expanded');

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-edit')
    const inputCheck = document.createElement('input');
    inputCheck.type = 'checkbox';
    inputCheck.name = 'todo';
    inputCheck.id = 'todo';
    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.name = 'text-edit'
    inputTitle.id = 'text-edit'
    inputTitle.value = task.title;
    inputTitle.maxLength = '20'
    taskDiv.append(inputCheck, inputTitle);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description-edit');
    const labelDesc = document.createElement('label');
    labelDesc.for = 'description';
    labelDesc.textContent = "Description:";
    const inputDesc = document.createElement('input');
    inputDesc.type = "text";
    inputDesc.name = "description-edit";
    inputDesc.id = "description-edit";
    inputDesc.value = task.description;
    descriptionDiv.append(labelDesc, inputDesc)

    const priorityDateDiv = document.createElement('div');
    priorityDateDiv.classList.add('priority-date-edit');
    const select = document.createElement('select');
    select.name = 'priority-edit';
    select.id = 'priority-edit';
    select.maxLength = '100';
    select.classList.add(task.priority);

    const options = [
        { text: "Low", value: "low" },
        { text: "Medium", value: "medium" },
        { text: "High", value: "high" },
    ]
    options.forEach(option => {
        select.add(new Option(option.text, option.value))
    })

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'edit-date';
    dateInput.id = 'edit-input';
    dateInput.value = task.duedate;
    priorityDateDiv.append(select, dateInput)

    const editButtonDiv = document.createElement('div');
    editButtonDiv.classList.add('edit-buttons');
    const editSpan = document.createElement('span');
    editSpan.classList.add('edit');
    const editBtn = document.createElement('img');
    editBtn.src = editImg;
    editBtn.alt = "edit";
    editSpan.appendChild(editBtn);
    const expandSpan = document.createElement('span');
    expandSpan.classList.add('expand');
    const expandBtn = document.createElement('img');
    expandBtn.src = expandImg;
    expandBtn.alt = "expand";
    expandSpan.appendChild(expandBtn);
    const delSpan = document.createElement('span');
    delSpan.classList.add('delete');
    const delBtn = document.createElement('img');
    delBtn.src = delImg;
    delBtn.alt = "delete";
    delSpan.appendChild(delBtn);
    editButtonDiv.append(editSpan, expandSpan, delSpan)

    expandBtn.addEventListener('click', () => {
        const visibility = window.getComputedStyle(descriptionDiv)
        if(visibility.display === "none") {
            descriptionDiv.style.display = "";
        }
        else {
            descriptionDiv.style.display = "none"
        }
    })

    taskContainer.append(taskDiv, descriptionDiv, priorityDateDiv, editButtonDiv);

}