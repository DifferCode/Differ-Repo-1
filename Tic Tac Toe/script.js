let playButton = document.getElementById("play-button");
let boxes = document.getElementsByClassName("box");
let playAgainButton = document.getElementById("play-again");

playButton.onclick = function() {
    document.getElementById("game").style.display = "flex";
    document.getElementById("start").style.display = "none";
}

let player = ['X', 'O'];
let whoTurn = 0;
let filledBox = 0;

for(let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    box.addEventListener("click", () => {
        if(box.textContent === 'X' || box.textContent === 'O') return;
        box.textContent = player[whoTurn];
        if(whoTurn === 0) {
            box.style.color = "dodgerblue";
            whoTurn = 1;
            document.getElementById("player-turn").textContent = whoTurn + 1;
        }else {
            box.style.color = "red";
            whoTurn = 0;
            document.getElementById("player-turn").textContent = whoTurn + 1;
        }
        filledBox++;
        checkWinner();
    })
}

function checkWinner() {
    for(let i = 0; i < 3; i++) {
        let row = i * 3;
        if(boxes[row].textContent != "" && boxes[row].textContent == boxes[row+1].textContent && boxes[row+1].textContent == boxes[row+2].textContent) {
            boxes[row].textContent == 'X' ? displayWinner(1) : displayWinner(2);
            return;
        }
        if(boxes[i].textContent != "" && boxes[i].textContent == boxes[i+3].textContent && boxes[i+3].textContent == boxes[i+6].textContent) {
            boxes[i].textContent == 'X' ? displayWinner(1) : displayWinner(2);
            return;
        }
    }
    if(boxes[0].textContent != "" && boxes[0].textContent == boxes[4].textContent && boxes[4].textContent == boxes[8].textContent) {
        boxes[0].textContent == 'X' ? displayWinner(1) : displayWinner(2);
        return;
    }
    if(boxes[2].textContent != "" && boxes[2].textContent == boxes[4].textContent && boxes[4].textContent == boxes[6].textContent) {
        boxes[2].textContent == 'X' ? displayWinner(1) : displayWinner(2);
        return;
    }
    
    if(filledBox === 9) displayTie();
}

function displayTie() {
    document.getElementById("game").style.display = "none";
    document.getElementById("game-over").style.display = "flex";
    document.getElementById("winner-display").textContent = "Its a tie!";
}

function displayWinner(winner) {
    document.getElementById("game").style.display = "none";
    document.getElementById("game-over").style.display = "flex";
    document.getElementById("winner-display").textContent = "Player " + winner + " won!";
}

playAgainButton.onclick = function() {
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].textContent = "";
    }
    document.getElementById("game").style.display = "flex";
    document.getElementById("game-over").style.display = "none";
    document.getElementById("player-turn").textContent = "1";
    whoTurn = 0;
    filledBox = 0;
}