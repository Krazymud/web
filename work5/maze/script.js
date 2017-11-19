var canvas = document.getElementById('maze');
var whole = document.getElementsByTagName('html')[0];
var dem = document.getElementById('demonstration');
var tip = document.getElementById('guide');
var isinS = 0;
var isinE = 0;
var sign = 0;
window.onload = function() {
    draw();
    drawdemo();
    whole.addEventListener('mousemove', function () {
        tip_change(event)
    });
    canvas.addEventListener('mouseout', function () {
        lose(event)
    });
}
function lose(event){
    isinS = 0;
    draw();
}
function tip_change(event){
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    if(x >= 3 && x <= 47 && y >= 211 && y <= 255) {
        tip.className = 'n_opa';
        tip.innerHTML = 'Show your move';
        isinS = 1;
        isinE = 0;
        sign = 0;
    }
    else if(x >= 480 && x <= 524 && y >= 211 && y <= 255){
        tip.className = 'n_opa';
        if(sign == 1)
            return;
        else {
            if (isinS == 1)
                tip.innerHTML = 'You win!';
            else
                tip.innerHTML = 'Don\'t cheat, you should start ' +
                    'from the \'S\' and move to the \'E\' inside the maze!';
            if (isinE == 0) {
                isinE = 1;
            }
        }
    }
    else{
        if(isinS){
            if((x >= 3 && x <= 524 && y >= 3 && y <= 83) ||
                (x >= 3 && x <= 172 && y >= 83 && y <= 203) ||
                (x >= 356 && x <= 524 && y >= 83 && y <= 203)){
                tip.className = 'n_opa';
                var line = canvas.getContext('2d');
                line.strokeStyle = '#000';
                line.fillStyle = 'red';
                line.lineWidth = 2;
                line.beginPath();
                line.moveTo(5, 5);
                line.lineTo(525,5);
                line.lineTo(525,205);
                line.lineTo(357, 205);
                line.lineTo(357, 85);
                line.lineTo(173, 85);
                line.lineTo(173, 205);
                line.lineTo(5, 205);
                line.closePath();
                line.fill();
                line.stroke();
                tip.innerHTML = 'You lose! Try again';
                sign = 1;
            }
            else if((x >= 3 && x <= 524 && y >= 263 && y <= 323) ||
                (x >= 232 && x <= 295 && y >= 143 && y <= 263)){
                tip.className = 'n_opa';
                var line = canvas.getContext('2d');
                line.strokeStyle = '#000';
                line.fillStyle = 'red';
                line.lineWidth = 2;
                line.beginPath();
                line.moveTo(5, 265);
                line.lineTo(5, 325);
                line.lineTo(525,325);
                line.lineTo(525, 265);
                line.lineTo(297, 265);
                line.lineTo(297, 145);
                line.lineTo(233, 145);
                line.lineTo(233, 265);
                line.closePath();
                line.fill();
                line.stroke();
                tip.innerHTML = 'You lose! Try again';
                sign = 1;
            }
            else {
                tip.className = 'opa';
                draw();
                if(sign == 1)
                    isinS = 0;
            }
        }
        if(isinE == 1)
            isinS = 0;
    }
}
function draw(){
    var line = canvas.getContext('2d');
    line.font = 'bold 40px Arial';
    line.textAlign = 'center';
    line.textBaseline = 'middle'
    line.strokeStyle = '#000';
    line.fillStyle = '#EDEDED';
    line.lineWidth = 2;
    line.beginPath();
    line.moveTo(5, 5);
    line.lineTo(525,5);
    line.lineTo(525,205);
    line.lineTo(357, 205);
    line.lineTo(357, 85);
    line.lineTo(173, 85);
    line.lineTo(173, 205);
    line.lineTo(5, 205);
    line.closePath();
    line.fill();
    line.stroke();
    //top-half
    line.beginPath();
    line.moveTo(5, 265);
    line.lineTo(5, 325);
    line.lineTo(525,325);
    line.lineTo(525, 265);
    line.lineTo(297, 265);
    line.lineTo(297, 145);
    line.lineTo(233, 145);
    line.lineTo(233, 265);
    line.closePath();
    line.fill();
    line.stroke();
    //bottom-half
    line.fillStyle = '#83FF79';
    line.beginPath();
    line.moveTo(5, 213);
    line.lineTo(49, 213);
    line.lineTo(49, 257);
    line.lineTo(5, 257);
    line.closePath();
    line.fill();
    line.stroke();
    //left-logo
    line.fillStyle = '#807BFC';
    line.beginPath();
    line.moveTo(481, 213);
    line.lineTo(525, 213);
    line.lineTo(525, 257);
    line.lineTo(481, 257);
    line.closePath();
    line.fill();
    line.stroke();
    //right-logo
    line.fillStyle = '#000';
    line.fillText('S', 26.5, 235);
    line.fillText('E', 502.5, 235);
}
function drawdemo(){
    var demo = dem.getContext('2d');
    demo.fillStyle = '#EDEDED';
    demo.beginPath();
    demo.moveTo(0, 0);
    demo.lineTo(100, 0);
    demo.lineTo(100, 40);
    demo.lineTo(0, 40);
    demo.closePath();
    demo.fill();
    demo.stroke();
}

