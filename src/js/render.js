import { createProject, deleteProject, deleteTaskInArray, editToDo } from "./toDo.js";
import { compareAsc } from "date-fns";
import closeImg from "../images-and-icons/close.svg";
import expandImg from "../images-and-icons/expand.svg";
import editImg from "../images-and-icons/edit.svg";
import delImg from "../images-and-icons/delete.svg"
import saveImg from "../images-and-icons/save.svg"

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

export function renderExpandedTask(task) {

    const canvas = document.querySelector('#to-dos');
    const form = document.createElement('form');


    const toDoExpanded = document.createElement('div');
    toDoExpanded.classList.add('to-do-expanded');
    toDoExpanded.dataset.id = task.id;

    const projectContainer = document.querySelector('.select');
    const projectName = projectContainer.querySelector('#project-name').textContent;

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
    inputTitle.disabled = true;
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
    inputDesc.disabled = true;
    descriptionDiv.style.display = "none";
    descriptionDiv.append(labelDesc, inputDesc)

    const priorityDateDiv = document.createElement('div');
    priorityDateDiv.classList.add('priority-date-edit');
    const inputSelect = document.createElement('select');
    inputSelect.name = 'priority-edit';
    inputSelect.id = 'priority-edit';
    inputSelect.maxLength = '100';
    inputSelect.classList.add(task.priority);

    inputSelect.addEventListener('change', (event) => {
        inputSelect.className = "";
        inputSelect.classList.add(event.target.value);
    })

    const options = [
        { text: "Low", value: "low" },
        { text: "Medium", value: "medium" },
        { text: "High", value: "high" },
    ]
    options.forEach(option => {
        inputSelect.add(new Option(option.text, option.value))
    })
    inputSelect.disabled = true;

    const inputDate = document.createElement('input');
    inputDate.type = 'date';
    inputDate.name = 'edit-date';
    inputDate.id = 'edit-input';
    inputDate.value = task.duedate;
    inputDate.disabled = true;
    inputDate.style.display = "none";
    priorityDateDiv.append(inputSelect, inputDate);


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
    editButtonDiv.append(editSpan, expandSpan, delSpan);

    expandSpan.addEventListener('click', () => {
        const visibility = window.getComputedStyle(descriptionDiv)
        if (visibility.display === "none") {
            descriptionDiv.style.display = "";
            inputDate.style.display = "";
            editSpan.classList.add('edit-mode');
        }
        else {
            descriptionDiv.style.display = "none"
            inputDate.style.display = "none";
            editSpan.classList.remove('edit-mode');
        }
    })

    delSpan.addEventListener('click', () => {
        deleteTask(projectName, toDoExpanded);
    })

    const hr = document.createElement('hr');

    toDoExpanded.append(taskDiv, descriptionDiv, priorityDateDiv, editButtonDiv, hr);
    form.appendChild(toDoExpanded);
    canvas.appendChild(form);

    let editing = false;
    editSpan.addEventListener('click', () => {

        if (editing == false) {
            editBtn.src = saveImg;

            for (const element of form.elements) {
                element.disabled = false;
            }

            editing = true;
        }

        else if (editing == true) {

            const title = inputTitle.value;
            const description = inputDesc.value;
            const select = inputSelect.value;
            const duedate = inputDate.value;

            editToDo(task, title, description, select, duedate);
            editBtn.src = editImg;

            for (const elements of form.elements) {
                if (elements === inputCheck) {
                    continue;
                }
                elements.disabled = true;
            }
            editing = false;
        }

    })

}

export function renderAllTasks(taskArray) {
    taskArray.forEach(task => {
        renderExpandedTask(task);
    });
}

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

// function editTask(form, task, inputTitle, inputDescription, inputSelect, inputDate, editSpan) {
// for (const element of form.elements) {
//     element.disabled = false;
// }


// }

