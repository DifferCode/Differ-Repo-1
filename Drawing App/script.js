window.addEventListener('load', () => {
    const canvas = document.getElementById("canvas");
    let colorButton = document.getElementsByClassName("color");
    const brushSizePicker = document.getElementById("brush-size-picker");
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const scaleFactorX = canvas.width / rect.width;
    const scaleFactorY = canvas.height / rect.height;
    
    let painting = false;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    let currentSelectedColorIndex = 0;
    
    function startPosition(e) {
        painting = true;
        draw(e);
    }
    
    function finishPosition() {
        painting = false;
        ctx.beginPath();
    }
    
    function draw(e) {
        if(!painting) return;
        ctx.lineTo(getX(e), getY(e));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(getX(e), getY(e));
    }
    
    function getX(e) {
        if(e.type === 'touchstart' || e.type === 'touchmove') {
            return (e.touches[0].clientX - rect.left) * scaleFactorX;
        }
        return (e.clientX - rect.left) * scaleFactorX;
    }
    
    function getY(e) {
        if(e.type === 'touchstart' || e.type === 'touchmove') {
            return (e.touches[0].clientY - rect.top) * scaleFactorY;
        }
        return (e.clientY - rect.top) * scaleFactorY;
    }
    
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startPosition(e);
    });
    canvas.addEventListener('touchend', finishPosition);
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e);
    });
    
    for(let i = 0; i < colorButton.length; i++) {
        let color = colorButton[i];
        color.addEventListener('click', () => {
            ctx.strokeStyle = color.getAttribute('data-color');
            color.setAttribute('data-status', 'selected');
            colorButton[currentSelectedColorIndex].setAttribute('data-status', 'unselected');
            currentSelectedColorIndex = i;
        })
    }
    
    brushSizePicker.addEventListener('change', () => {
        ctx.lineWidth = brushSizePicker.value;
        document.getElementById("brush-size-display").textContent = brushSizePicker.value;
    });
    
    document.getElementById("clear-button").addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    })
});