import { createProject } from "./toDo.js";

export function renderProjects() {
    const projectForm = document.querySelector('.project-form')
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
    }
}

function setProjectColor(item, projectColor) {
    item.style.setProperty('--project-color', projectColor);
}