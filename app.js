/*=========================
  QyxnoraCore v2
  app.js - PART 1
=========================*/

let current = [];
let copied = [];
let currentProject = null;

const textarea = document.getElementById("numbers");
const result = document.getElementById("result");

const totalBox = document.getElementById("total");
const copiedBox = document.getElementById("copied");
const remainingBox = document.getElementById("remaining");
const countriesBox = document.getElementById("countries");

const flags = {

"Afghanistan":"🇦🇫",
"Albania":"🇦🇱",
"Algeria":"🇩🇿",
"Angola":"🇦🇴",
"Argentina":"🇦🇷",
"Armenia":"🇦🇲",
"Australia":"🇦🇺",
"Austria":"🇦🇹",
"Azerbaijan":"🇦🇿",
"Bangladesh":"🇧🇩",
"Belarus":"🇧🇾",
"Belgium":"🇧🇪",
"Benin":"🇧🇯",
"Bhutan":"🇧🇹",
"Bolivia":"🇧🇴",
"Brazil":"🇧🇷",
"Bulgaria":"🇧🇬",
"Burkina Faso":"🇧🇫",
"Cambodia":"🇰🇭",
"Cameroon":"🇨🇲",
"Canada":"🇨🇦",
"Chile":"🇨🇱",
"China":"🇨🇳",
"Colombia":"🇨🇴",
"Comoros":"🇰🇲",
"Congo":"🇨🇩",
"Croatia":"🇭🇷",
"Czech Republic":"🇨🇿",
"Denmark":"🇩🇰",
"Ecuador":"🇪🇨",
"Egypt":"🇪🇬",
"Estonia":"🇪🇪",
"Ethiopia":"🇪🇹",
"Finland":"🇫🇮",
"France":"🇫🇷",
"Gabon":"🇬🇦",
"Georgia":"🇬🇪",
"Germany":"🇩🇪",
"Ghana":"🇬🇭",
"Greece":"🇬🇷",
"Guinea":"🇬🇳",
"Hungary":"🇭🇺",
"India":"🇮🇳",
"Indonesia":"🇮🇩",
"Iran":"🇮🇷",
"Iraq":"🇮🇶",
"Ireland":"🇮🇪",
"Israel":"🇮🇱",
"Italy":"🇮🇹",
"Ivory Coast":"🇨🇮",
"Japan":"🇯🇵",
"Jordan":"🇯🇴",
"Kazakhstan":"🇰🇿",
"Kenya":"🇰🇪",
"Kosovo":"🇽🇰",
"Kuwait":"🇰🇼",
"Kyrgyzstan":"🇰🇬",
"Lebanon":"🇱🇧",
"Lesotho":"🇱🇸",
"Libya":"🇱🇾",
"Madagascar":"🇲🇬",
"Malaysia":"🇲🇾",
"Mauritania":"🇲🇷",
"Mexico":"🇲🇽",
"Moldova":"🇲🇩",
"Mongolia":"🇲🇳",
"Morocco":"🇲🇦",
"Mozambique":"🇲🇿",
"Myanmar":"🇲🇲",
"Nepal":"🇳🇵",
"Netherlands":"🇳🇱",
"New Zealand":"🇳🇿",
"Niger":"🇳🇪",
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
"Senegal":"🇸🇳",
"Serbia":"🇷🇸",
"Singapore":"🇸🇬",
"Slovenia":"🇸🇮",
"South Africa":"🇿🇦",
"South Korea":"🇰🇷",
"Spain":"🇪🇸",
"Sri Lanka":"🇱🇰",
"Sudan":"🇸🇩",
"Sweden":"🇸🇪",
"Switzerland":"🇨🇭",
"Syria":"🇸🇾",
"Tajikistan":"🇹🇯",
"Tanzania":"🇹🇿",
"Thailand":"🇹🇭",
"Tunisia":"🇹🇳",
"Turkey":"🇹🇷",
"Uganda":"🇺🇬",
"Ukraine":"🇺🇦",
"United Arab Emirates":"🇦🇪",
"United Kingdom":"🇬🇧",
"United States":"🇺🇸",
"USA":"🇺🇸",
"UAE":"🇦🇪",
"Uzbekistan":"🇺🇿",
"Vietnam":"🇻🇳",
"Yemen":"🇾🇪",
"Zimbabwe":"🇿🇼"

};

const countryCodes = {

"93":"Afghanistan",
"355":"Albania",
"213":"Algeria",
"244":"Angola",
"54":"Argentina",
"374":"Armenia",
"61":"Australia",
"43":"Austria",
"994":"Azerbaijan",
"880":"Bangladesh",
"375":"Belarus",
"32":"Belgium",
"229":"Benin",
"975":"Bhutan",
"591":"Bolivia",
"55":"Brazil",
"359":"Bulgaria",
"226":"Burkina Faso",
"855":"Cambodia",
"237":"Cameroon",
"1":"United States",
"56":"Chile",
"86":"China",
"57":"Colombia",
"269":"Comoros",
"243":"Congo",
"385":"Croatia",
"420":"Czech Republic",
"45":"Denmark",
"593":"Ecuador",
"20":"Egypt",
"372":"Estonia",
"251":"Ethiopia",
"358":"Finland",
"33":"France",
"241":"Gabon",
"995":"Georgia",
"49":"Germany",
"233":"Ghana",
"30":"Greece",
"224":"Guinea",
"36":"Hungary",
"91":"India",
"62":"Indonesia",
"98":"Iran",
"964":"Iraq",
"353":"Ireland",
"972":"Israel",
"39":"Italy",
"225":"Ivory Coast",
"81":"Japan",
"962":"Jordan",
"7":"Russia",
"76":"Kazakhstan",
"254":"Kenya",
"383":"Kosovo",
"965":"Kuwait",
"996":"Kyrgyzstan",
"961":"Lebanon",
"266":"Lesotho",
"218":"Libya",
"261":"Madagascar",
"60":"Malaysia",
"222":"Mauritania",
"52":"Mexico",
"373":"Moldova",
"976":"Mongolia",
"212":"Morocco",
"258":"Mozambique",
"95":"Myanmar",
"977":"Nepal",
"31":"Netherlands",
"64":"New Zealand",
"227":"Niger",
"234":"Nigeria",
"47":"Norway",
"968":"Oman",
"92":"Pakistan",
"970":"Palestine",
"63":"Philippines",
"48":"Poland",
"351":"Portugal",
"974":"Qatar",
"40":"Romania",
"966":"Saudi Arabia",
"221":"Senegal",
"381":"Serbia",
"65":"Singapore",
"386":"Slovenia",
"27":"South Africa",
"82":"South Korea",
"34":"Spain",
"94":"Sri Lanka",
"249":"Sudan",
"46":"Sweden",
"41":"Switzerland",
"963":"Syria",
"992":"Tajikistan",
"255":"Tanzania",
"66":"Thailand",
"216":"Tunisia",
"90":"Turkey",
"256":"Uganda",
"380":"Ukraine",
"971":"United Arab Emirates",
"44":"United Kingdom",
"998":"Uzbekistan",
"84":"Vietnam",
"967":"Yemen",
"263":"Zimbabwe"

};
/*=========================
 QyxnoraCore v2
 app.js - PART 2
=========================*/

function detectCountry(text, number = "") {

    for (let name in flags) {
        if (text.toLowerCase().includes(name.toLowerCase())) {
            return name;
        }
    }

    let clean = number.replace(/\D/g, "");

    const codes = Object.keys(countryCodes).sort((a, b) => b.length - a.length);

    for (let code of codes) {
        if (clean.startsWith(code)) {
            return countryCodes[code];
        }
    }

    return "Unknown";
}

function parseNumbers() {

    const lines = textarea.value.split(/\n+/);

    current = [];

    lines.forEach(line => {

        let match = line.match(/\+?\d{8,15}/);

        if (!match) return;

        let num = match[0].trim();

        current.push({

            id: Date.now() + Math.random(),

            number: num,

            country: detectCountry(line, num),

            copied: false

        });

    });

}

function updateStats() {

    totalBox.innerText = current.length;

    copiedBox.innerText = current.filter(x => x.copied).length;

    remainingBox.innerText = current.filter(x => !x.copied).length;

    countriesBox.innerText = [...new Set(current.map(x => x.country))].length;

}

function createRow(item) {

    const row = document.createElement("div");

    row.className = "row";

    if (item.copied) {

        row.style.background = "#ff4fa31f";

        row.style.border = "1px solid #ff4fa3";

    }

    const flag = flags[item.country] || "🌍";

    row.innerHTML = `

<div class="left">

<div class="flag">${flag}</div>

<div>

<div class="country">${item.country}</div>

<div class="number">${item.number}</div>

</div>

</div>

<button class="copyBtn">

${item.copied ? "✅ Copied" : "📋 Copy"}

</button>

`;

    row.querySelector(".copyBtn").onclick = () => {

        navigator.clipboard.writeText(item.number);

        item.copied = true;

        render();

    };

    return row;

}

function render() {

    result.innerHTML = "";

    current.forEach(item => {

        result.appendChild(createRow(item));

    });

    updateStats();

}

function refreshData() {

    parseNumbers();

    render();

}

textarea.addEventListener("input", refreshData);

window.onload = () => {

    refreshData();

};
/*=========================
 QyxnoraCore v2
 app.js - PART 3
=========================*/

function saveToTextarea() {

    textarea.value = current.map(x => x.number).join("\n");

}

function addPrefix() {

    let prefix = document.getElementById("addPrefix").value.trim();

    if (!prefix) return;

    current = current.map(item => {

        let num = item.number.replace(/^\+/, "");

        if (!num.startsWith(prefix)) {
            num = prefix + num;
        }

        return {
            ...item,
            number: num,
            country: detectCountry("", num)
        };

    });

    saveToTextarea();
    render();

}

function removePrefix() {

    let prefix = document.getElementById("removePrefix").value.trim();

    if (!prefix) return;

    current = current.map(item => {

        let num = item.number.replace(/^\+/, "");

        if (num.startsWith(prefix)) {
            num = num.substring(prefix.length);
        }

        return {
            ...item,
            number: num,
            country: detectCountry("", num)
        };

    });

    saveToTextarea();
    render();

}

function addPlus() {

    current = current.map(item => ({

        ...item,

        number: item.number.startsWith("+")
            ? item.number
            : "+" + item.number

    }));

    saveToTextarea();
    render();

}

function removePlus() {

    current = current.map(item => ({

        ...item,

        number: item.number.replace(/^\+/, "")

    }));

    saveToTextarea();
    render();

}

function removeDuplicate() {

    const seen = new Set();

    current = current.filter(item => {

        let key = item.number.replace(/\D/g, "");

        if (seen.has(key)) return false;

        seen.add(key);

        return true;

    });

    saveToTextarea();
    render();

}

function copyAll() {

    if (!current.length) return;

    navigator.clipboard.writeText(

        current.map(x => x.number).join("\n")

    );

    current.forEach(x => x.copied = true);

    render();

    alert("All Numbers Copied");

}

function clearAll() {

    current = [];

    textarea.value = "";

    render();

}

function downloadTxt() {

    const blob = new Blob(

        [current.map(x => x.number).join("\n")],

        { type: "text/plain" }

    );

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "numbers.txt";

    a.click();

}

function searchNumber(keyword) {

    keyword = keyword.toLowerCase();

    document.querySelectorAll(".row").forEach(row => {

        row.style.display =

            row.innerText.toLowerCase().includes(keyword)

                ? "flex"

                : "none";

    });

}
/*=========================
 QyxnoraCore v2
 app.js - PART 4 (FINAL)
=========================*/

function saveData() {

    localStorage.setItem("qyxnora_numbers", JSON.stringify(current));

    localStorage.setItem("qyxnora_text", textarea.value);

    alert("Data Saved");

}

function loadSavedData() {

    const saved = localStorage.getItem("qyxnora_numbers");
    const text = localStorage.getItem("qyxnora_text");

    if (text) {
        textarea.value = text;
    }

    if (saved) {

        try {

            current = JSON.parse(saved);

            render();

        } catch (e) {

            refreshData();

        }

    }

}

window.addEventListener("beforeunload", () => {

    localStorage.setItem("qyxnora_numbers", JSON.stringify(current));

    localStorage.setItem("qyxnora_text", textarea.value);

});

document.addEventListener("keydown", e => {

    if (e.ctrlKey && e.key.toLowerCase() === "s") {

        e.preventDefault();

        saveData();

    }

    if (e.ctrlKey && e.key.toLowerCase() === "f") {

        e.preventDefault();

        let keyword = prompt("Search Number or Country");

        if (keyword) {

            searchNumber(keyword);

        }

    }

});

loadSavedData();

setInterval(() => {

    updateStats();

}, 1000);

console.log("QyxnoraCore v2 Loaded Successfully");
/*=========================
 QyxnoraCore v2
 app.js - PART 5
=========================*/

// ===== Filter =====

function showPending() {

    result.innerHTML = "";

    current
    .filter(item => !item.copied)
    .forEach(item => {

        result.appendChild(createRow(item));

    });

}

function showCopied() {

    result.innerHTML = "";

    current
    .filter(item => item.copied)
    .forEach(item => {

        result.appendChild(createRow(item));

    });

}

function resetCopied() {

    current.forEach(item => {

        item.copied = false;

    });

    render();

}

// ===== Sort =====

function sortNumbers() {

    current.sort((a,b)=>

        a.number.localeCompare(b.number)

    );

    render();

}

function sortCountries() {

    current.sort((a,b)=>

        a.country.localeCompare(b.country)

    );

    render();

}

// ===== Country Filter =====

function filterCountry(country){

    result.innerHTML="";

    current
    .filter(item=>item.country===country)
    .forEach(item=>{

        result.appendChild(createRow(item));

    });

}

// ===== JSON Export =====

function exportJSON(){

    const blob=new Blob(

        [JSON.stringify(current,null,2)],

        {type:"application/json"}

    );

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="numbers.json";

    a.click();

}

// ===== JSON Import =====

function importJSON(file){

    const reader=new FileReader();

    reader.onload=e=>{

        try{

            current=JSON.parse(e.target.result);

            saveToTextarea();

            render();

        }catch{

            alert("Invalid JSON");

        }

    };

    reader.readAsText(file);

            }
