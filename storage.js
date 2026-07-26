const STORAGE_KEY = "qyxnora_projects_v2";

function getProjects() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveProjects(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function createProject(name) {

    let projects = getProjects();

    const project = {
        id: Date.now(),
        name: name,
        created: new Date().toISOString(),
        numbers: [],
        copied: []
    };

    projects.push(project);

    saveProjects(projects);

    return project;
}

function deleteProject(id) {

    let projects = getProjects().filter(
        p => p.id != id
    );

    saveProjects(projects);

}

function updateProject(project) {

    let projects = getProjects();

    const index = projects.findIndex(
        p => p.id == project.id
    );

    if(index>-1){

        projects[index]=project;

        saveProjects(projects);

    }

      }
