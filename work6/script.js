var img = document.getElementsByClassName('img');
var btn = document.getElementById('start');
var tip = document.getElementById('tip');
var input = document.getElementById('input');
var is_start = 0;
var array = new Array();
for (var i = 0; i < img.length; i++){
    array[i] = img[i];
}
window.onload = function() {
    for (var i = 0; i < img.length; i++) {
        img[i].addEventListener('click', (function (num) {
            return function(){
                if(is_start == 0) {
                    tip.innerHTML = '请先开始游戏';
                    return;
                }
                tip.innerHTML = "";
                var num1 = num;
                for(var j = 0; j < img.length; j++)
                    if(img[num1] == array[j])
                        var temp = j;
                num1 = temp;
                var can_move = 0;
                for(var j = 0; j < array.length; j++)
                    if(window.getComputedStyle(array[j]).visibility == 'hidden')
                        can_move = j;
                if(num1 == can_move - 1 || num1 == can_move + 1 || num1 == can_move - 4 || num1 == can_move + 4) {
                    move(num1, can_move);
                }
                checkgame();
            };
        })(i));
    }
    btn.addEventListener('click', start);
    input.addEventListener('change', changeImg);
}

function changeImg(){
    var file = input.files[0];
    if(file.type.indexOf('image') !== -1){
        var reader = new FileReader();
        reader.onload = function(e){
            var dataURL = reader.result;
            for(var i = 0; i < img.length; i++){
                img[i].style.backgroundImage = 'url(' + dataURL + ')';
            }
        }
        reader.readAsDataURL(file);
    }
    reload();
    btn.innerHTML = "开始";
}

function reload(){
    for(var i = 0; i < array.length; i++){
        array[i].style.top =  array[i].style.left = array[i].style.right = array[i].style.bottom = 0;
        array[i] = img[i];
    }
    for(var i = 0; i < array.length; i++)
        array[i].id = ("p" + (i + 1));
    is_start = 0;
}

function checkgame(){
    var is_over = 1;
    for(var i = 0; i < img.length; i++){
        if(array[i].id != ("p" + (i + 1)))
            is_over = 0;
    }
    if(is_over == 1)
        tip.innerHTML = '恭喜你完成拼图！';
}

function move(num, can_move){
    if(num == can_move - 1){
        if(num == 7 || num == 3 || num == 11)
            return;
        var rgt = isNaN(parseInt(array[can_move].style.right)) ? 0 : parseInt(array[can_move].style.right);
        array[can_move].style.right = (rgt + 90) + 'px';
        var lft = isNaN(parseInt(array[num].style.left)) ? 0 : parseInt(array[num].style.left);
        array[num].style.left = (lft + 90) + 'px';
    }
    if(num == can_move + 1){
        if(num == 12 || num == 8 || num == 4)
            return;
        var rgt = isNaN(parseInt(array[can_move].style.right)) ? 0 : parseInt(array[can_move].style.right);
        array[can_move].style.right = (rgt - 90) + 'px';
        var lft = isNaN(parseInt(array[num].style.left)) ? 0 : parseInt(array[num].style.left);
        array[num].style.left = (lft - 90) + 'px';
    }
    if(num == can_move - 4){
        var btm = isNaN(parseInt(array[can_move].style.bottom)) ? 0 : parseInt(array[can_move].style.bottom);
        array[can_move].style.bottom = (btm + 90) + 'px';
        var tp = isNaN(parseInt(array[num].style.top)) ? 0 : parseInt(array[num].style.top);
        array[num].style.top = (tp + 90) + 'px';
    }
    if(num == can_move + 4){
        var btm = isNaN(parseInt(array[can_move].style.bottom)) ? 0 : parseInt(array[can_move].style.bottom);
        array[can_move].style.bottom = (btm - 90) + 'px';
        var tp = isNaN(parseInt(array[num].style.top)) ? 0 : parseInt(array[num].style.top);
        array[num].style.top = (tp - 90) + 'px';
    }
    var swap = array[num];
    array[num] = array[can_move];
    array[can_move] = swap;
}

function start(){
    tip.innerHTML = "";
    is_start = 1;
    var blank = 0;
    var arr = [];
    var ranArr = [];
    for(var i = 0; i <= 15; i++)
        arr[i] = i;
    do{
        var index = Math.floor(Math.random() * arr.length);
        var flag = true;
        ranArr.push(arr[index]);
        arr.splice(index, 1);
        if(arr.length == 0)
            flag = false;
    } while(flag);
    if(checkpuzzle(ranArr)){
        start();
        return;
    }
    reload();
    is_start = 1;
    for(var i = 0; i < array.length; i++){
         array[i].id = "p" + (ranArr[i] + 1);
         if(ranArr[i] == 15)
             blank = i;
    }
    btn.innerHTML = "重新开始";
}

function checkpuzzle(arr){
    var inNum = 0;
    for(var i = 0; i < 16; i++){
        for(var j = i + 1; j < 16; j++)
            if(arr[i] > arr[j])
                inNum++;
    }
    for(var j = 0; j < array.length; j++)
        if(window.getComputedStyle(array[j]).visibility == 'hidden'){
            inNum += (6 - j % 4 - j / 4);
        }
    return (inNum % 2 == 0);
}