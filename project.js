let currentProject = null;

function renderProjects() {

    const list = document.getElementById("projectList");

    if (!list) return;

    list.innerHTML = "";

    const projects = getProjects();

    projects.forEach(project => {

        const item = document.createElement("div");

        item.className = "projectItem";

        item.innerHTML = `
            <strong>${project.name}</strong><br>
            <small>${project.numbers.length} Numbers</small>
        `;

        item.onclick = () => openProject(project.id);

        list.appendChild(item);

    });

}

function openProject(id) {

    const projects = getProjects();

    currentProject = projects.find(p => p.id == id);

    if (!currentProject) return;

    document.getElementById("projectTitle").innerText = currentProject.name;

    document.getElementById("projectName").value = currentProject.name;

    document.getElementById("numbers").value =
        currentProject.numbers.join("\n");

}

document.addEventListener("DOMContentLoaded", () => {

    renderProjects();

    document
        .getElementById("newProjectBtn")
        .onclick = () => {

        const name = prompt("Project Name");

        if (!name) return;

        createProject(name);

        renderProjects();

    };

});
