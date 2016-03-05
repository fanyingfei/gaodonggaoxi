var max_name_len = 30;
var min_name_len = 3;
//通用AJAX
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
            obj.success(result);
        },
        error:function (){
            alert('提交失败,请刷新重试');
        }
    })
}
//主体内容点oo
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
//主体内容点xx
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
//字段是否有效
function valid(name,email,content){
    if(name == ''){
        alert('请填写昵称');
        return false;
    }
    if(name.length > max_name_len || name.length < min_name_len){
        alert('昵称长度3-30个字符');
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
//定位播放图片按钮
function show_play(){
    $(".play").each(function(){
        width = $(this).prev().width();
        height = $(this).prev().height();
        $(this).css("width",width+'px');
        $(this).css("height",height+'px');
        $(this).css("line-height",height+'px');
        $(this).css("margin-top",'-'+parseFloat(height + 4)+'px');
        $(this).show();
    });
}

//新窗口打开登陆页面
function login(){
    var openUrl = "";//弹出窗口的url
    var iWidth=600; //弹出窗口的宽度;
    var iHeight=560; //弹出窗口的高度;
    var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth-10-iWidth)/2;; //获得窗口的水平位置;
    window.open('/login','newwindow','height='+iHeight+',width='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
}

//资源加载完成
window.onload=function(){
    show_play();
}

//DOM渲染完成
$(document).ready(function(){
    var comment_url = '/content/record';
    var reply_url = '/reply/record'

    //监听主体OO点击事件
    $(".oo_xx .oo").click(function(){
        click_good(comment_url,this);
    })

    //监听主体XX点击事件
    $(".oo_xx .xx").click(function(){
        click_bad(comment_url,this);
    })

    //监听评论@点击事件
    $('body').on('click', '.r_ta', function(){
        $(this).addClass("at").parents('.reply_one').siblings().find(".r_ta").removeClass('at');
        $(this).parents('.reply_main').find('.textarea-wrapper textarea').val('@'+$(this).data('name')+'  ');
        height = $(this).parents('.reply_main').find('.textarea-wrapper textarea').offset().top;
        $('html,body').animate({scrollTop: height -34}, 500);
    });

    //监听评论OO点击事件
    $('body').on('click', '.reply_main .oo', function(){
        click_good(reply_url,this);
    });

    //监听评论XX点击事件
    $('body').on('click', '.reply_main .xx', function(){
        click_bad(reply_url,this);
    });

    //关闭回复
    $('body').on('click', '.close_reply', function(){
        $(this).parents('.reply_wapper').hide(500,function(){
            $(this).parents('.reply_wapper').remove();
        });
    });

    //监听评论提交点击事件
    $('body').on('click', '.reply-submit', function(){
        var obj = $(this);
        var id = obj.attr('data-id');
        var parent_id = 0;
        var parent_name = '';
        if(obj.parents('.reply_main').find('.at').length > 0){
            parent_id = obj.parents('.reply_main').find('.at').attr('data-id');
            parent_name = obj.parents('.reply_main').find('.at').attr('data-name');
        }

        var content = $.trim(obj.parents('.textarea-wrapper').children('textarea').val()) ;
        if(content == ''){
            alert('请填写评论');
            return false;
        }
        content = content.replace(/\n/g,"<br/>");
        $.ajax({
            type:'POST',
            data:{
                "id":id,'content':content,'parent_id':parent_id,'parent_name':parent_name
            },
            url:'/reply/save',
            dataType:'json',
            success:function(result){
                if(result.status == 'error'){
                    alert(result.msg);
                    return false;
                }

            },
            error:function (){
                alert('提交失败,请刷新重试');
            }
        })
    });
    //监听到顶部点击事件
    $("#top").click(function(){
        $('html,body').animate({scrollTop: 0}, 500);
    })
    //监听到底部点击事件
    $(".mao").click(function(){
        var height = $(document).height();
        $('html,body').animate({scrollTop: height}, 500);
    })
    //监听验证码的点击事件
    $("#checkpic").click(function(){
        $(this).attr('src','/code.php?'+Math.random());
    })
    //监听滚动条滚动事件
    $(window).scroll(function(){
        if($(window).scrollTop() >$(window).height()/2){
            $("#top").show();
        }else{
            $("#top").hide();
        }
    });
    //监听头部导航点击事件
    $(".nav li a").click(function(){
        $.cookie('search', '' ,{ path : '/' });
    })

    //监听图片双击事件
    $(".sina_show").dblclick(function(){
        window.open($(this).attr('src'));
    })

    //监听图片单击事件
    $(".sina_show").click(function(){
        max_height = $(this).css("max-height");
        img_height = $(this).height();
        if(max_height == 'none'){
            $(this).css("max-height","600px");
            if(img_height > 1000){
                height = $(this).offset().top;
                $('html,body').animate({scrollTop: height + 500}, 500);
            }
        }else{
            $(this).css("max-height","none");
        }
    })

    //监听图片播放事件
    $(".play").click(function(){
        obj = $(this).prev('img');
        src = obj.attr('ori-data');
        obj.attr('src',src);
        $(this).hide();
    })

    //监听搜索事件
    $(".search button").click(function(){
        var search = $("#search").val();
        $.cookie('search', search , {path:'/'});
        window.location.href=window.location.href;
    })

    //得到全部回复列表
    $("a.reply").click(function(){
        var obj = $(this);
        var id = obj.attr('data-id');
        $.ajax({
            type:'POST',
            data:{
                "id":id
            },
            url:'/reply',
            dataType:'json',
            success:function(result){
                if(result.status == 'error'){
                    alert(result.msg);
                    return false;
                }
                if(obj.parents('.one').next().hasClass('reply_wapper')){
                    obj.text('↓回复');
                    obj.parents('.one').next('.reply_wapper').hide(500,function(){
                        obj.parents('.one').next('.reply_wapper').remove();
                    });

                }else{
                    obj.text('↑回复');
                    obj.parent().children('.reply_count').text(result.data.list.length);
                    var html = reply_list(result);
                    obj.parents('.one').after(html);
                    obj.parents('.one').next('.reply_wapper').show(500);
                }
            },
            error:function (){
                alert('提交失败,请刷新重试');
            }
        })
    })

    function reply_list(result){
        var html = '<div class="reply_wapper"><hr class="hr_reply"><div class="reply_main">';
        if(result.data.list != ''){
            var count = result.data.list.length;
            html += '<div class="reply_title">回复</div>';
            $.each(result.data.list, function(k, v){
                html += '<div class="reply_one">';
                html += '<div class="reply_avatar left"><img src="'+v.avatar+'" /></div>';
                html += '<div class="reply_content left">';
                html += '<p><span  class="r_name">'+v.name+'</span>';
                if(v.parent_id != 0 && v.parent_name != ''){
                    html += '<span class="time">&nbsp;&nbsp;@&nbsp;&nbsp;</span>';
                    html += '<span  class="r_name">'+v.parent_name+'</span>';
                }
                html += '<span class="time right">'+(count - k)+'L</span></p>';
                if(v.parent_id != 0 && v.parent_name != '' && v.reply_content != ''){
                    html += '<p><span class="time left">回复</span><span class="qy left"></span>';
                    html += '<span class="reply_at_content left">'+v['reply_content']+'</span>';
                    html += '<span class="hy left"></span></p>';
                }
                html += '<p class="r_comment">'+v.content+'</p>';
                html += '<p class="click">';
                html += '<span class="time">'+ v.create_time+'</span>';
                html += '<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>';
                html += '<span class="r_ta" data-id="'+ v.user_id+'" data-name="'+ v.name+'">@Ta</span>';
                html += '<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>';
                html += '<a class="oo" title="支持" data-id="'+v.rep_id+'">OO</a>[<span class="good">'+v.good+'</span>]';
                html += '<span>&nbsp;&nbsp;</span>';
                html += '<a class="xx" title="反对" data-id="'+v.rep_id+'">XX</a>[<span class="bad">'+v.bad+'</span>]';
                html += '<span>&nbsp;&nbsp;</span>';
                html += '<span class="response"></span></p>';
                html += '</div>';
                html += '</div>';
            });
        }else{
            html += '<div class="reply_title">还没有评论</div>';
        }

        if(result.data.is_login == 1){
            html += '<div class="reply_comment">';
            html += '<p>'+result.data.name+'<span>&nbsp;&nbsp;</span><span></span></p>';
            html += '<div class="reply_avatar left"><img src="'+result.data.avatar+'" /></div>';
            html += '<div class="textarea-wrapper left">';
            html += '<textarea placeholder="说点什么吧"></textarea>';
            html += '<p class="post-toolbar"><button data-id="'+result.data.con_id+'" class="reply-submit ds-post-button">发布</button></p>';
            html += '</div></div><p class="close_reply">[X]关闭回复</p></div>';
        }else{
            html += '<div class="reply_no_login">';
            html += '<span onclick="login()">&nbsp;登录&nbsp;</span>后才能回复';
            html += '<p class="close_reply">[X]关闭回复</p></div>';
        }
        return html;
    }


})
