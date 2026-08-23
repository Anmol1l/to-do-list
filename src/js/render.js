import { createProject, deleteProject } from "./toDo.js";
import closeImg from "../images-and-icons/close.svg"

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

// render project section

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