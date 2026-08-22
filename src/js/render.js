import { createProject, deleteProject } from "./toDo.js";
import closeImg from "../images-and-icons/close.svg"

export function renderProjects() {
    const projectForm = document.querySelector('.project-form')
    const projectName = document.querySelector('#project').value;
    const projectColor = document.querySelector('#color').value;

    const projectList = document.querySelector('.projects ul');
    const listItem = document.createElement('li');
    listItem.classList.add('new-project');
    const div = document.createElement('div');
    const spanText = document.createElement('span')

    const spanImg = document.createElement('span')
    spanImg.id = 'img'
    const img = document.createElement('img');
    img.src = closeImg;
    img.alt = "close";
    spanImg.appendChild(img);

    if (projectForm.reportValidity() && projectName != 'toDo') {
        spanText.textContent = projectName;
        div.append(spanText, spanImg);
        listItem.appendChild(div);

        createProject(projectName);
        setProjectColor(listItem, projectColor)

        projectList.appendChild(listItem);
        projectForm.reset();
    }

    spanImg.addEventListener('click', () => {
        deleteProjectRender(listItem,projectList,projectName);
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
    },{ once: true });
    yes.addEventListener('click', () => {
        projectList.removeChild(listItem);
        deleteProject(projectName);
        deleteDialog.close();
    },{ once: true });
}