let outputDisplay = document.getElementById("outputDisplay");
let numberButtons = document.getElementsByClassName("number");
let operatorButtons = document.getElementsByClassName("operator");
let deleteButton = document.getElementById("delete-button");
let resetButton = document.getElementById("reset-button");
let equalsButton = document.getElementById("equals-button");

let input = "";
let result = "";
let previousInput = "";

for (let i = 0; i < numberButtons.length; i++) {
    let button = numberButtons[i];
    button.addEventListener("click", () => {
        console.log(`Button ${i} clicked!`);
        input += button.textContent;
        outputDisplay.textContent = input;
    });
};

for(let i = 0; i < operatorButtons.length; i++) {
    let operator = operatorButtons[i];
    operator.addEventListener("click", () => {
        console.log(operator.textContent, "has been clicked!");
        switch(operator.textContent) {
            case "x":
                input += "*";
                break;
            case "÷":
                input += "/";
                break;
            default:
                input += operator.textContent;
        }
        outputDisplay.textContent = input;
    });
};

deleteButton.onclick = function() {
    let str = String(outputDisplay.textContent);
    let newStr = str.substring(0, str.length - 1);
    outputDisplay.textContent = newStr;
    input = newStr;
}

resetButton.onclick = function() {
    outputDisplay.textContent = "";
    input = "";
}

equalsButton.onclick = function() {
    let operators = input.split(/[0-9]+/).filter(Boolean);
    let operands = input.split(/[\+\-\*\/]/);
    let result = parseFloat(operands[0]);
    for (let i = 1; i < operands.length; i++) {
        let operator = operators[i-1];
        let operand = parseFloat(operands[i]);
        if (operator === '+') {
            result += operand;
        } else if (operator === '-') {
            result -= operand;
        } else if (operator === '*') {
            result *= operand;
        } else if (operator === '/') {
            result /= operand;
        }
    }
    outputDisplay.textContent = result;
}
