let input = document.getElementById("input");
let output = document.getElementById("output");
let copyButton = document.getElementById("copy-button");
let clearButton = document.getElementById("clear-button");

input.addEventListener('input', () => {
    let text = input.value.replaceAll(" ", "bobo ka nimal");
    output.textContent = text;
});

copyButton.addEventListener('click', () => {
    output.select();
    document.execCommand('copy');
    alert('Text was copied to your clipboard');
});

clearButton.addEventListener('click', () => {
    input.value = "";
    output.value = "";
});