function ajax_res(obj){
    $.ajax({
        type:'POST',
        data:obj.data,
        url:obj.requestUrl,
        dataType:'json',
        success:function(result){
            if(result.status == 'error'){
                alert(result.msg);
                return false;
            }
            obj.success(result.data);
        },
        error:function (){}
    })
}

function click_good(url , thi){
    var id = $(thi).attr('data-id');
    var type = $("#type").val();
    $.ajax({
        type:'POST',
        data:{
            "id":id,"click":'good','type':type
        },
        url:url,
        dataType:'json',
        success:function(result){
            if(result.status == 'error'){
                alert(result.msg);
                return false;
            }
            var val = $(thi).parent().children('.good').text();
            $(thi).parent().children('.good').text(parseInt(val) + 1);
            $(thi).parent().children('.response').text(result.msg);
        },
        error:function (){}
    })
}

function click_bad(url , thi){
    var id = $(thi).attr('data-id');
    var type = $("#type").val();
    $.ajax({
        type:'POST',
        data:{
            "id":id,"click":'bad','type':type
        },
        url:url,
        dataType:'json',
        success:function(result){
            if(result.status == 'error'){
                alert(result.msg);
                return false;
            }
            var val = $(thi).parent().children('.bad').text();
            $(thi).parent().children('.bad').text(parseInt(val) + 1);
            $(thi).parent().children('.response').text(result.msg);
        },
        error:function (){}
    })
}

$(".search button").click(function(){
    var search = $("#search").val();
    $.cookie('search', search);
    window.location.href=window.location.href;
})

function valid(name,email,content){
    if(name == ''){
        alert('请填写昵称');
        return false;
    }
    if(name.length > 12){
        alert('昵称过长');
        return false;
    }
    if(email == ''){
        alert('请填写email');
        return false;
    }
    if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
        alert('email格式不正确');
        return false;
    }
    if(content == '' || content == '<br>'){
        alert('请填写内容');
        return false;
    }
    return true;
}
$(document).ready(function(){
    var comment_url = '/content/comment';

    $(".oo").click(function(){
        click_good(comment_url,this);
    })

    $(".xx").click(function(){
        click_bad(comment_url,this);
    })

    $(".mao").click(function(){
        document.getElementsByTagName('BODY')[0].scrollTop=document.getElementsByTagName('BODY')[0].scrollHeight;
    })
})