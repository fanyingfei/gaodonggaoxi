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
    var id = $(thi).parents('.one').attr('data-id');
    $.ajax({
        type:'POST',
        data:{
            "id":id,"click":'good'
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
    var id = $(thi).parents('.one').attr('data-id');
    $.ajax({
        type:'POST',
        data:{
            "id":id,"click":'bad'
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