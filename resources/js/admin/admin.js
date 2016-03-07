var sub_cfg = {};
sub_cfg.success = function(result){
    $('button[name=refresh]').trigger("click");
};

$(".table-toolbar .btn").click(function(){
    var ids = get_selected();
    if(ids == ''){
        alert('请选择操作项');
        return false;
    }

    sub_cfg.data = {"ids":ids};
    sub_cfg.requestUrl = $(this).attr('data-url');

    admin_ajax_res(sub_cfg);
})

function get_selected(){
    var str = '';
    $("input[name='btSelectItem']:checkbox").each(function(){
        if($(this).attr("checked")){
            str += $(this).parent().next("td").text()+","
        }
    })
    str = str.substring(0,str.length-1);
    return str;
}

function admin_ajax_res(obj){
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