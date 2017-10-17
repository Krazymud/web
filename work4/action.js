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
    document.getElementById("cal").value += this.value;
}

document.onkeydown = function(event){
    if(event.keyCode == 13)
        calc();
}

function back(){
    var string = document.getElementById("cal").value;
    var x = document.getElementById("cal").value.length;
    var str = string.substring(0, x - 1);
    if(x >= 1)
        document.getElementById("cal").value = str;
}

function clr(){
    document.getElementById("cal").value = "";
}

function calc(){
    var str = document.getElementById("cal").value;
    var sign = true;
    for(var n = 0; n < str.length; n++){
        if(str[n] < "(" || str[n] > "9" || str[n] == ",")
            sign = false;
        if(str[n] == "/" && str[n+1] == "/")
            sign = false;
    }
    if(sign == true) {
        try {
            document.getElementById("cal").value = eval(document.getElementById("cal").value);
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


