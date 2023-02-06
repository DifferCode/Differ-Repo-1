const body = document.getElementById("body");
const input = document.getElementById("input-color");
const current = document.getElementById("current-bg");

function changeBg() {
    body.style.backgroundColor = "" + input.value + "";
    current.innerHTML = "" + input.value + "";
}