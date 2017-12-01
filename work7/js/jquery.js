let username = /^[a-zA-Z][0-9a-zA-Z\_]{5,17}$/;
let email = /^[a-zA-Z0-9_\-]+@(([a-zA-Z0-9_\-])+\.)+[a-zA-Z]{2,4}$/;
let number = /^[1-9]\d{7}$/;
let phone = /^[1-9]\d{10}$/;
let data = {};
$('#clear').click(function(){
    $('input').val('');
    $('#tip').html('');
    $('p').html('');
});

$('input').focus(function(){
    switch(this.name){
        case 'username':
            $('#in_user').html('');
            break;
        case 'number':
            $('#in_num').html('');
            break;
        case 'phone':
            $('#in_phone').html('');
            break;
        case 'email':
            $('#in_email').html('');
            break;
    }
})

$('input').blur(function(){
        switch(this.name){
            case 'username':
                if(username.test($(this).val()) === false)
                    $('#in_user').html('用户名格式错误！');
                else
                    $('#in_user').html('√');
                break;
            case 'number':
                if(number.test($(this).val()) === false)
                    $('#in_num').html('学号格式错误！');
                else
                    $('#in_num').html('√');
                break;
            case 'phone':
                if(phone.test($(this).val()) === false)
                    $('#in_phone').html('电话号码格式错误！');
                else
                    $('#in_phone').html('√');
                break;
            case 'email':
                if(email.test($(this).val()) === false)
                    $('#in_email').html('邮箱格式错误！');
                else
                    $('#in_email').html('√');
                break;
        }
});

$('#submit').click(loadMess);

function loadMess(){
    $('#tip').html('');
    if(checkValid()) {
        data.username = $('input[name=\'username\']').val();
        data.number = $('input[name=\'number\']').val();
        data.phone = $('input[name=\'phone\']').val();
        data.email = $('input[name=\'email\']').val();
        let xmlhttp = $.post('?username=no', data)
            .done(function(data, status, xhr){
                window.location.href = '?username=' + $('input[name=\'username\']').val();
            })
            .fail(function(xhr, status){
                $('#tip').html(xhr.responseText);
            })
    }
}

function checkValid(){
    let state = 1;
    if(username.test($('input[name=\'username\']').val()) === false ||
        number.test($('input[name=\'number\']').val()) === false ||
        phone.test($('input[name=\'phone\']').val()) === false ||
        email.test($('input[name=\'email\']').val()) === false)
        state = 0;
    return state;
}