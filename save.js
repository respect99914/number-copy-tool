function saveData(){

localStorage.setItem(
"lamixData",
document.getElementById("numbers").value
);

alert("Data Saved");

}

window.onload=function(){

let saved=
localStorage.getItem("lamixData");

if(saved){

document.getElementById("numbers").value=saved;

if(typeof loadNumbers==="function"){
loadNumbers();
}

}

}
