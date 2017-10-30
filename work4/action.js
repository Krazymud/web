var clr_sign = 1;
var ele = document.getElementsByTagName("button");
for (var i = 0; i < ele.length; i++) {
    if (i >= 0 && i <= 13)
        ele[i].addEventListener("click", copy);
    else if (i >= 15 && i <= 17)
        ele[i].addEventListener("click", copy);
    else if (i == 14)
        ele[i].addEventListener("click", back);
    else if (i == 18)
        ele[i].addEventListener("click", clr);
    else
        ele[i].addEventListener("click", calc);
}

function copy(){
    if(clr_sign == 0) {
        if(this.value == "/" || this.value == "*" || this.value == "-"
        || this.value == "+"){}
        else
            clr();
    }
    document.getElementById("cal").value += this.value;
    var x = document.getElementById("cal");
    x.style.backgroundColor = "cornsilk";
    clr_sign = 1;
}

document.onkeydown = function(event){
    switch(event.keyCode){
        case 13: calc();
                break;
        case 8: back();
                break;
    }
    for(var i = 96; i <= 105; i++){
        if(event.keyCode == i){
            document.getElementById("cal").value += (i - 96);
            var x = document.getElementById("cal");
            x.style.backgroundColor = "cornsilk";
            clr_sign = 1;
        }
    }
}

function back(){
    var string = document.getElementById("cal").value;
    var x = document.getElementById("cal").value.length;
    var str = string.substring(0, x - 1);
    if(x >= 1)
        document.getElementById("cal").value = str;
    if(x <= 1){
        var x = document.getElementById("cal");
        x.style.backgroundColor = "white";
    }
}

function clr(){
    document.getElementById("cal").value = "";
    var x = document.getElementById("cal");
    x.style.backgroundColor = "white";
}

function calc(){
    var str = document.getElementById("cal").value;
    var sign = true;
    for(var n = 0; n < str.length; n++){
        if(str[n] < "(" || str[n] > "9" || str[n] == ",")
            sign = false;
        if(str[n] == "/" && (str[n+1] == "/" || str[n+1] == "*"))
            sign = false;
    }
    if(sign == true) {
        try {
            if(eval(document.getElementById("cal").value) == Infinity ||
                eval(document.getElementById("cal").value) == -Infinity ||
                isNaN(eval(document.getElementById("cal").value))) {
                alert("请输入合法的计算表达式！");
                clr();
            }
            else {
                document.getElementById("cal").value = eval(document.getElementById("cal").value);
                clr_sign = 0;
            }
        }
        catch (err) {
            alert("请输入正确的计算表达式！");
            clr();
        }
    }
    else{
        alert("请输入正确的计算表达式！");
        clr();
    }
}