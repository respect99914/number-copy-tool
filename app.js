let current = [];
let copiedCount = 0;

const flags = {
"Afghanistan":"🇦🇫",
"Albania":"🇦🇱",
"Algeria":"🇩🇿",
"Argentina":"🇦🇷",
"Australia":"🇦🇺",
"Austria":"🇦🇹",
"Bangladesh":"🇧🇩",
"Belgium":"🇧🇪",
"Brazil":"🇧🇷",
"Bulgaria":"🇧🇬",
"Cambodia":"🇰🇭",
"Canada":"🇨🇦",
"Chile":"🇨🇱",
"China":"🇨🇳",
"Colombia":"🇨🇴",
"Croatia":"🇭🇷",
"Czech Republic":"🇨🇿",
"Denmark":"🇩🇰",
"Egypt":"🇪🇬",
"Estonia":"🇪🇪",
"Ethiopia":"🇪🇹",
"Finland":"🇫🇮",
"France":"🇫🇷",
"Germany":"🇩🇪",
"Ghana":"🇬🇭",
"Greece":"🇬🇷",
"Hungary":"🇭🇺",
"India":"🇮🇳",
"Indonesia":"🇮🇩",
"Iran":"🇮🇷",
"Iraq":"🇮🇶",
"Ireland":"🇮🇪",
"Israel":"🇮🇱",
"Italy":"🇮🇹",
"Japan":"🇯🇵",
"Jordan":"🇯🇴",
"Kazakhstan":"🇰🇿",
"Kenya":"🇰🇪",
"Kuwait":"🇰🇼",
"Lebanon":"🇱🇧",
"Libya":"🇱🇾",
"Malaysia":"🇲🇾",
"Mexico":"🇲🇽",
"Morocco":"🇲🇦",
"Myanmar":"🇲🇲",
"Nepal":"🇳🇵",
"Netherlands":"🇳🇱",
"New Zealand":"🇳🇿",
"Nigeria":"🇳🇬",
"Norway":"🇳🇴",
"Oman":"🇴🇲",
"Pakistan":"🇵🇰",
"Palestine":"🇵🇸",
"Philippines":"🇵🇭",
"Poland":"🇵🇱",
"Portugal":"🇵🇹",
"Qatar":"🇶🇦",
"Romania":"🇷🇴",
"Russia":"🇷🇺",
"Saudi Arabia":"🇸🇦",
"Serbia":"🇷🇸",
"Singapore":"🇸🇬",
"South Africa":"🇿🇦",
"South Korea":"🇰🇷",
"Spain":"🇪🇸",
"Sri Lanka":"🇱🇰",
"Sweden":"🇸🇪",
"Switzerland":"🇨🇭",
"Syria":"🇸🇾",
"Thailand":"🇹🇭",
"Tunisia":"🇹🇳",
"Turkey":"🇹🇷",
"UAE":"🇦🇪",
"United Arab Emirates":"🇦🇪",
"UK":"🇬🇧",
"United Kingdom":"🇬🇧",
"Ukraine":"🇺🇦",
"USA":"🇺🇸",
"United States":"🇺🇸",
"Vietnam":"🇻🇳",
"Yemen":"🇾🇪",
"Zimbabwe":"🇿🇼"
};

function detectCountry(text) {
    for (let country in flags) {
        if (text.includes(country)) {
            return country;
        }
    }
    return "Unknown";
}

function getNumbers() {
    const text = document.getElementById("numbers").value;
    const lines = text.split("\n");
    const list = [];

    lines.forEach(line => {
        const match = line.match(/\d{8,15}/);

        if (match) {
            list.push({
                number: match[0],
                country: detectCountry(line),
                copied: false
            });
        }
    });

    return list;
  }
function updateStats() {
    document.getElementById("totalCount").textContent = current.length;

    document.getElementById("copiedCount").textContent =
        current.filter(n => n.copied).length;

    document.getElementById("pendingCount").textContent =
        current.filter(n => !n.copied).length;

    const countries = [...new Set(current.map(n => n.country))];
    document.getElementById("countryCount").textContent = countries.length;
}

function renderNumbers() {

    const box = document.getElementById("result");
    box.innerHTML = "";

    current.forEach((item, index) => {

        const row = document.createElement("div");
        row.className = item.copied ? "number copied" : "number";

        row.innerHTML = `
            <div>
                <b>${flags[item.country] || "🌍"} ${item.country}</b><br>
                ${item.number}
            </div>

            <button onclick="copyNumber(${index})">
                ${item.copied ? "Copied" : "Copy"}
            </button>
        `;

        box.appendChild(row);

    });

    updateStats();
    }
function copyNumber(index) {

    current[index].copied = true;

    renderNumbers();

    if (currentProject) {
        currentProject.numbers = current;
        updateProject(currentProject);
    }

}

function loadNumbers() {

    current = getNumbers();

    renderNumbers();

}

document.getElementById("numbers").addEventListener("input", loadNumbers);

window.onload = function () {

    if (currentProject && currentProject.numbers) {

        current = currentProject.numbers;

        renderNumbers();

    }

};
function saveCurrentProject() {

    if (!currentProject) return;

    currentProject.name =
        document.getElementById("projectName").value;

    currentProject.text =
        document.getElementById("numbers").value;

    currentProject.numbers = current;

    updateProject(currentProject);

    const status = document.getElementById("saveStatus");

    if (status) {
        status.textContent = "✓ Auto Saved";
    }
}

document.getElementById("projectName")
.addEventListener("input", saveCurrentProject);

document.getElementById("numbers")
.addEventListener("input", function () {

    loadNumbers();

    saveCurrentProject();

});
function removeDuplicates() {

    const seen = new Set();

    current = current.filter(item => {
        if (seen.has(item.number)) return false;
        seen.add(item.number);
        return true;
    });

    renderNumbers();
    saveCurrentProject();
}

function copyAll() {

    const text = current.map(item => item.number).join("\n");

    navigator.clipboard.writeText(text);

    current.forEach(item => item.copied = true);

    renderNumbers();
    saveCurrentProject();

    alert("All numbers copied successfully!");
}

function downloadTxt() {

    const text = current.map(item => item.number).join("\n");

    const blob = new Blob([text], { type: "text/plain" });

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = (currentProject ? currentProject.name : "numbers") + ".txt";

    a.click();

    URL.revokeObjectURL(a.href);
}

function clearAll() {

    if (!confirm("Clear all numbers?")) return;

    current = [];

    document.getElementById("numbers").value = "";

    renderNumbers();

    saveCurrentProject();
        }
function searchNumbers(keyword = "") {

    keyword = keyword.toLowerCase();

    const box = document.getElementById("result");

    box.innerHTML = "";

    current
        .filter(item =>
            item.number.includes(keyword) ||
            item.country.toLowerCase().includes(keyword)
        )
        .forEach((item, index) => {

            const row = document.createElement("div");

            row.className = item.copied ? "number copied" : "number";

            row.innerHTML = `
                <div>
                    <b>${flags[item.country] || "🌍"} ${item.country}</b><br>
                    ${item.number}
                </div>

                <button onclick="copyNumber(${index})">
                    ${item.copied ? "Copied" : "Copy"}
                </button>
            `;

            box.appendChild(row);

        });
}

function showPending() {

    const box = document.getElementById("result");

    box.innerHTML = "";

    current
        .filter(item => !item.copied)
        .forEach((item, index) => {

            const row = document.createElement("div");

            row.className = "number";

            row.innerHTML = `
                <div>
                    <b>${flags[item.country] || "🌍"} ${item.country}</b><br>
                    ${item.number}
                </div>

                <button onclick="copyNumber(${index})">Copy</button>
            `;

            box.appendChild(row);

        });
}

function showCopied() {

    const box = document.getElementById("result");

    box.innerHTML = "";

    current
        .filter(item => item.copied)
        .forEach((item, index) => {

            const row = document.createElement("div");

            row.className = "number copied";

            row.innerHTML = `
                <div>
                    <b>${flags[item.country] || "🌍"} ${item.country}</b><br>
                    ${item.number}
                </div>

                <button disabled>Copied</button>
            `;

            box.appendChild(row);

        });
}
function filterByCountry(country) {

    const box = document.getElementById("result");
    box.innerHTML = "";

    current
        .filter(item => country === "All" || item.country === country)
        .forEach((item, index) => {

            const row = document.createElement("div");

            row.className = item.copied ? "number copied" : "number";

            row.innerHTML = `
                <div>
                    <b>${flags[item.country] || "🌍"} ${item.country}</b><br>
                    ${item.number}
                </div>
                <button onclick="copyNumber(${index})">
                    ${item.copied ? "Copied" : "Copy"}
                </button>
            `;

            box.appendChild(row);
        });
}

function copyPending() {

    const list = current
        .filter(x => !x.copied)
        .map(x => x.number)
        .join("\n");

    navigator.clipboard.writeText(list);

    current.forEach(x => {
        if (!x.copied) x.copied = true;
    });

    renderNumbers();
    saveCurrentProject();
}

function deleteCopied() {

    current = current.filter(x => !x.copied);

    renderNumbers();
    saveCurrentProject();
}

function deletePending() {

    current = current.filter(x => x.copied);

    renderNumbers();
    saveCurrentProject();
}

function renameProject() {

    if (!currentProject) return;

    const name = prompt("New Project Name", currentProject.name);

    if (!name) return;

    currentProject.name = name;

    document.getElementById("projectName").value = name;

    updateProject(currentProject);

    renderProjects();
}

function deleteProjectConfirm() {

    if (!currentProject) return;

    if (!confirm("Delete this project?")) return;

    deleteProject(currentProject.id);

    currentProject = null;

    renderProjects();

    document.getElementById("numbers").value = "";
    document.getElementById("projectName").value = "";
    current = [];

    renderNumbers();
}

function refreshDashboard() {

    updateStats();

    const status = document.getElementById("saveStatus");

    if (status) {
        status.textContent = "Ready";
    }
}

setInterval(refreshDashboard,3000);
