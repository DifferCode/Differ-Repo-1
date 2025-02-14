const openButton = document.getElementById("open-button");

openButton.addEventListener('click', () => {
    const flap = document.getElementById("flap");
    flap.style.animation = 'openFlap 0.5s linear 0s 1 forwards'
    document.getElementById("letter").style.animation = 'showLetter 0.5s linear 0.5s 1 forwards'
    document.getElementById("envelope").style.zIndex = '4'
    const hearts = document.querySelectorAll(".heart");
    hearts.forEach((heart, index) => {
        heart.style.zIndex = '3'
        heart.style.animation = "float 10s ease-in-out 1 forwards";
    })
});

const letter = document.getElementById("letter");

letter.addEventListener('click', () => {
    document.getElementById("message-wrapper").style.display = 'block'
});

const closeButton = document.getElementById("close-button")

closeButton.addEventListener('click', () => {
    document.getElementById("message-wrapper").style.display = 'none'
})