var min_name_len = 2;
var max_name_len = 30;

var min_pass_len = 6;
var max_pass_len = 30;

function available_name(name){
    if(name == ''){
        alert_msg('请填写昵称');
        return false;
    }
    if(name.length > max_name_len || name.length < min_name_len){
        alert_msg('昵称长度2-30个字符');
        return false;
    }
    return true;
}

function available_email(email){
    if(email == ''){
        alert_msg('请填写email');
        return false;
    }
    if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
        alert_msg('email格式不正确');
        return false;
    }
    return true;
}

function available_content(content){
    if(content == '' || content == '<br>'){
        alert_msg('请填写内容');
        return false;
    }
    return true;
}

function available_empty(str,msg){
    if(str == ''){
        alert_msg(msg);
        return false;
    }
    return true;
}

function available_pass(password){
    if(password == ''){
        alert_msg('请填写密码');
        return false;
    }
    if((password.length < 6) || (password.length > 30)){
        alert_msg('密码长度6-30个字符');
        return false;
    }
    return true;
}

function available_pass_confirm(pass,pass_copy){
    if(pass_copy == ''){
        alert_msg('请确认密码');
        return false;
    }
    if(pass != pass_copy){
        alert_msg('前后密码不一致');
        return false;
    }
    return true;
}