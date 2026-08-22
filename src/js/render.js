import { createProject } from "./toDo.js";
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

    if (projectForm.reportValidity()) {
        spanText.textContent = projectName;
        div.append(spanText,spanImg);
        listItem.appendChild(div);

        createProject(projectName);
        setProjectColor(listItem, projectColor)

        projectList.appendChild(listItem);
        projectForm.reset();
    }
}

function setProjectColor(item, projectColor) {
    item.style.setProperty('--project-color', projectColor);
}