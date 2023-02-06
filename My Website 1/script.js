const body = document.getElementById("body");
const input = document.getElementById("input-color");

function changeBg() {
    body.style.backgroundColor = "" + input.value + "";
}