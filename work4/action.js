copy = function(x){
    document.getElementById("cal").value += document.getElementsByName("display")[x].value;
}

document.onkeydown = function(event){
    if(event.keyCode == 13)
        calc();
}

back = function(){

    var string = document.getElementById("cal").value;
    var x = document.getElementById("cal").value.length;
    var str = string.substring(0, x - 1);
    if(x >= 1)
        document.getElementById("cal").value = str;
}

clr = function(){
    document.getElementById("cal").value = "";
}

calc = function(){
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
