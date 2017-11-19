for(var n = 0; n < 60; n++){
    var radios = document.createElement('input');
    radios.type = 'radio';
    var obj = document.getElementById('game').appendChild(radios);
    obj.className = 'mole';
}
var time_left = 30;
var time;
var stop;
var playing = 2;
var random = 0;
var btn = document.getElementById('btn');
var mess = document.getElementById('tip').children[0];
var score = document.getElementById('score');
var radio = document.getElementsByTagName('input');
var point = 0;

window.onload = function(){
    btn.addEventListener('click', SwitchMode);
    for(var i = 0; i <= 59; i++) {
        radio[i].addEventListener('click', (function (num) {
            return function(){
                radio[num].checked = false;
                if(playing == 0 || playing == 2) {
                    if(num == random)
                        radio[num].checked = true;
                    alert('fuck');
                    return;
                }
                if(num == random) {
                    point++;
                    score.innerHTML = point;
                    MolePoking();
                }
                else{
                    if(point == 0){
                        EndGame();
                        return;
                    }
                    point--;
                    score.innerHTML = point;
                }
            }
        })(i));
    }
    canvas = document.getElementById('timer');
    drawTime();
}

function SwitchMode(){
    if(playing == 1){
        mess.innerHTML = 'Pausing';
        clearTimeout(time);
        clearTimeout(stop);
        time_left += 0.25;
        playing = 0; //pause
    }
    else{
        mess.innerHTML = 'Playing';
        mess.style.color = 'green';
        if(playing == 2) {
            time_left = 30;
            score.innerHTML = 0;
            MolePoking();
        }
        stop = setTimeout('EndGame()', time_left*1000);
        timecount();
        playing = 1;
    }
}

function MolePoking(){
    var ran = Math.floor(Math.random()*60);
    radio[ran].checked = true;
    random = ran;
}

function timecount(){
    drawTime();
    time_left = time_left - 0.25;
    time = setTimeout('timecount()', 250);
}

function drawTime(){
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = (time_left <= 5) ? 'red' : 'aquamarine';
    ctx.clearRect(0,0,60,20);
    ctx.fillRect(0,0,time_left * 2,20);
    ctx.fillStyle = 'black';
    ctx.font = "16px black";
    ctx.textAlign = "center";
    ctx.fillText(Math.floor(time_left).toString(), 28, 16);
}

function EndGame(){
    document.getElementById('timer').innerHTML = 0;
    clearTimeout(time);
    clearTimeout(stop);
    alert('Game Over.\nYour score is: ' + score.innerHTML);
    if(point == 0)
        score.innerHTML = 0;
    for(var i = 0; i <= 59; i++){
        radio[i].checked = false;
    }
    playing = 2;  //end
    mess.innerHTML = 'Game Over!';
    mess.style.color = 'red';
    time_left = 30;
    drawTime();
}
