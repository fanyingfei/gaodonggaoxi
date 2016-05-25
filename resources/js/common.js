var max_name_len = 30;
var min_name_len = 2;

//通用AJAX
function ajax_res(obj , thi){
    if(is_has_class(thi)) return false;
    $.ajax({
        type:'POST',
        data:obj.data,
        url:obj.requestUrl,
        dataType:'json',
        success:function(result){
            if(result.status == 'error'){
                alert_msg(result.msg);
                return false;
            }
            obj.success(result);
        },
        error:function (){
            alert_msg('提交失败,请刷新重试');
        }
    })
    click_remove_class(thi);
}
//主体内容点oo
function click_good(url , thi){
    var id = $(thi).attr('data-id');
    var type = $('#type').val();
    $.ajax({
        type:'POST',
        data:{
            "id":id,"click":'good',"type":type
        },
        url:url,
        dataType:'json',
        success:function(result){
            if(result.status == 'error'){
                alert_msg(result.msg);
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
    var type = $('#type').val();
    $.ajax({
        type:'POST',
        data:{
            "id":id,"click":'bad',"type":type
        },
        url:url,
        dataType:'json',
        success:function(result){
            if(result.status == 'error'){
                alert_msg(result.msg);
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
        alert_msg('请填写昵称');
        return false;
    }
    if(name.length > max_name_len || name.length < min_name_len){
        alert_msg('昵称长度2-30个字符');
        return false;
    }
    if(email == ''){
        alert_msg('请填写email');
        return false;
    }
    if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
        alert_msg('email格式不正确');
        return false;
    }
    if(content == '' || content == '<br>'){
        alert_msg('请填写内容');
        return false;
    }
    return true;
}

function is_has_class(thi){
    if($(thi).hasClass('disabled')){
        return true;
    }else{
        $(thi).addClass('disabled');
        return false;
    }
}
function click_remove_class(thi){
    setTimeout(function(){$(thi).removeClass('disabled');}, 1500);
}

//定位播放图片按钮
function show_play_all(){
    $(".play").each(function(){
        show_play_one(this);
    });
}

function show_play_one(thi){
    width = $(thi).prev().width();
    height = $(thi).prev().height();
    if(width <=2 || height <= 2){
        return false;
    }
    $(thi).css("width",width+'px');
    $(thi).css("height",height+'px');
    $(thi).css("line-height",height+'px');
    $(thi).css("margin-top",'-'+parseFloat(height)+'px');
    $(thi).show();
}

function alert_msg(msg,type){
    if($('.alert-msg').length > 0){
        $('.alert-msg').remove();
    }
    if(type == undefined){
        type = 'info';
    }
    var html = '<div class="alert-msg"><span class="msg-info">';
    html += '<span class="icon '+type+'"></span>&nbsp;&nbsp;'+msg+'</span></div>';
    $('body').append(html);
    var obj = $('.alert-msg');
    var alert_width = obj.width();
    obj.css('left',$(document).width()/2 - alert_width/2);
    obj.fadeIn(500);
     setTimeout(function(){
         obj.fadeOut(500,function(){
             if(obj != undefined) obj.remove();
         });
     },2000);
}

function avatar_error(thi){
    $(thi).parent().hide();
}
function reply_avatar(thi){
    $(thi).attr('src','/resources/images/jpg/avatar_error.jpg');
}
function login(){
    window.location.href='/login';
}

//新窗口打开登陆页面
function login_new(){
    var openUrl = "";//弹出窗口的url
    var iWidth=600; //弹出窗口的宽度;
    var iHeight=560; //弹出窗口的高度;
    var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
    window.open('/login','newwindow','height='+iHeight+',' +
    'width='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,' +
    'scrollbars=no, resizable=no,location=no, status=no');
}

function image_is_gif(str){
    if(str.indexOf("small")>=0){
        return false;
    }
    return true;
}

function image_load_event(thi , src_url){
    var img = new Image(); //创建一个Image对象，实现图片的预下载
    img.src = src_url;
    if(img.complete) {
        $(thi).hide();
        $(thi).text('PLAY');
        return false; // 直接返回，不用再处理onload事件
    }
    img.onload = function () {
        $(thi).hide();
        $(thi).text('PLAY');
    };
}

//资源加载完成
window.onload=function(){
    show_play_all();
}
$(document).keypress(function(e) {
    // 回车键事件
    if(e.which == 13) {
        if($('.search #search').length > 0 && $('.search #search').val().length > 0)
        $(".search .search-btn").trigger('click');
    }
});
//DOM渲染完成
$(document).ready(function(){
    var reply_url = '/reply/record';

   // display();
    function display(){
        if($('.login_out').length <= 0){
            $('.examine').hide();
        }
    }


    $(".peripheral img").load(function(){
        if($(this).hasClass('sina-show-gif') && !image_is_gif($(this).attr('src'))){
            var play_obj = $(this).parent().children('.play');
            show_play_one(play_obj);
        }
    });

    //监听图片双击事件
    $(".sina-show").dblclick(function(){
        window.open($(this).attr('src'));
        return false;
    })

    //监听图片单击事件
    $('body').on('click', '.sina-show', function(){
        max_height = $(this).css("max-height");
        img_height = $(this).height();
        if(max_height == 'none'){
            $(this).css("max-height","600px");
            if(img_height > 1000){
                height = $(this).offset().top + 600;
                $('html,body').animate({scrollTop: height - 100}, 200);
            }
        }else{
            $(this).css("max-height","none");
        }
    })

    //监听图片单击事件
    $('body').on('click', '.sina-show-gif', function(){
        src_url = $(this).attr('ori-data');
        ori_src = $(this).attr('src');
        if(image_is_gif(ori_src)){
            $(this).next('div.play').show();
        }else{
            show_play_one($(this).next('div.play'));
            $(this).next('div.play').text('loading...');
            image_load_event($(this).next('div.play') , src_url);
        }
        $(this).attr('src',src_url);
        $(this).attr('ori-data',ori_src);
    })

    //监听图片播放事件
    $('body').on('click', '.play', function(){
        play_obj = $(this);
        pre_img_obj = $(this).prev('img');
        src_url = pre_img_obj.attr('ori-data');
        ori_src = pre_img_obj.attr('src');
        pre_img_obj.attr('src',src_url);
        pre_img_obj.attr('ori-data',ori_src);
        $(this).text('loading...');
        image_load_event(this,src_url);
        return false;
    })

    //贴标签
    $('body').on('click', '.tag', function(){
        if($(this).hasClass('tag-select')){
            $(this).removeClass('tag-select');
        }else{
            if($(this).parent().children('.tag-select').length >= 3){
                alert_msg('贴标签不能超过3个');
                return false;
            }
            $(this).addClass('tag-select');
        }
    })

    //添加标签
    $('body').on('click', '.add-tag', function(){
        if($(this).parent().children('.my-tag').length >= 3){
            alert_msg('新添标签不能超过3个');
            return false;
        }
        var tag_html = '<span class="tag my-tag"><input placeholder="请输入" value=""/></span>';
        $(this).before(tag_html);
    })

    //监听主体OO点击事件
    $('body').on('click', '.oo-xx .oo', function(){
        var comment_url =$('#comment-url').val();
        click_good(comment_url,this);
    })

    //监听主体XX点击事件
    $('body').on('click', '.oo-xx .xx', function(){
        var comment_url =$('#comment-url').val();
        click_bad(comment_url,this);
    })

    //监听评论@点击事件
    $('body').on('click', '.reply-ta', function(){
        if($(this).parents('.reply-main').find('.textarea-wrapper .edit-p').length <= 0){
            alert_msg('你还没有登陆哦');
            return false;
        }
        $(this).addClass("at").parents('.reply-section').siblings().find(".reply-ta").removeClass('at');
        var html_name = '<span class="reply-to-name">@'+$(this).data('name')+'</span>&nbsp;&nbsp;&nbsp;&nbsp;';
        $(this).parents('.reply-main').find('.textarea-wrapper .edit-p').html(html_name);
        height = $(this).parents('.reply-main').find('.textarea-wrapper .edit-p').offset().top;
        $('html,body').animate({scrollTop: height -200}, 500);
    });

    //监听评论OO点击事件
    $('body').on('click', '.reply-main .oo', function(){
        click_good(reply_url,this);
    });

    //监听评论XX点击事件
    $('body').on('click', '.reply-main .xx', function(){
        click_bad(reply_url,this);
    });

    $('body').on('click', '.alert-msg', function(){
        $(this).fadeOut(500,function(){
            $(this).remove();
        });
    });

    //关闭评论
    $('body').on('click', '.close-reply', function(){
        $(this).parents('.reply-wrapper').fadeOut(1000,function(){
            var len = $(this).find('.reply-section').length;
            $(this).parents('.section').find('.reply-count').text(len);
            var height = $(this).parents('.section').offset().top;
            $('html,body').animate({scrollTop: height}, 500);
            $(this).remove();
        });
    });

    $('body').on('click', '.qq-face', function(){
        if($(this).parents('.reply-wrapper').find('.facebox').length > 0 ){
            $(this).parents('.reply-wrapper').find('.facebox').remove();
            return false;
        }
        $('.facebox').remove();
        var faceimg = '<div class="facebox"><div class="qq-bg"><img src="/resources/images/png/face_qq.png" /></div><ul>';
        for(i=0;i<84;i++){  //通过循环创建60个表情，可扩展
            faceimg+='<li data-id="'+i+'"></li>';
        };
        faceimg+='</ul></div>';
        $(this).parents('.reply-wrapper').append(faceimg);
        var qq_height = $(this).offset().top;
        var qq_wight = $(this).offset().left;
        $('.facebox').css('top',qq_height - 170);
        $('.facebox').css('left',qq_wight - 150);
        $('.facebox').fadeIn(300);
        return false;
    });

    //添加表情
    $('body').on('click', '.facebox ul li', function(){
        var id = $(this).attr('data-id');
        var img = '<img src="/resources/images/face/'+id+'.gif" /> ';
        $(this).parents('.reply-wrapper').find('.edit-p').append(img);
        return false;
    });

    //监听到底部点击事件
    $('body').on('click', '.down', function(){
        var height = $(document).height();
        $('html,body').animate({scrollTop: height}, 500);
    })

    //监听到顶部点击事件
    $("#top").click(function(){
        $('html,body').animate({scrollTop: 0}, 500);
    })

    $(document).click(function() {
        $('.facebox').fadeOut(300);
        $('.facebox').remove();
    });

    //监听验证码的点击事件
    $("#checkpic").click(function(){
        $(this).attr('src','/tools/code.php?'+Math.random());
    })

    //监听滚动条滚动事件
    $(window).scroll(function(){
        if($(window).scrollTop() >$(window).height()/2){
            $("#top").show();
        }else{
            $("#top").hide();
        }
    });

    //监听搜索事件
    $(".search .search-btn").click(function(){
        var search = $("#search").val();
        $.cookie('search', search , { path : '/' });
        window.location.href=window.location.href;
    })

    //得到全部评论列表
    $('body').on('click', '.reply', function(){
        var obj = $(this);
        var id = obj.attr('data-id');
        var type = $("#type").val();

        if(obj.parents('.section').children('.reply-wrapper').length > 0){
            obj.parents('.section').children('.reply-wrapper').fadeOut(500,function(){
                obj.parents('.section').children('.reply-wrapper').remove();
            });
            return false;
        }

        $.ajax({
            type:'POST',
            data:{
                "id":id,"type":type
            },
            url:'/reply',
            dataType:'json',
            success:function(result){
                if(result.status == 'error'){
                    alert_msg(result.msg);
                    return false;
                }

                obj.parent().children('.reply-count').text(result.data.list.length);
                var html = reply_list(result);
                obj.parents('.section').append(html);
                obj.parents('.section').find('.reply-wrapper').slideDown(500);
            },
            error:function (){
                alert_msg('提交失败,请刷新重试');
            }
        })
    })

    //监听评论提交点击事件
    $('body').on('click', '.reply-submit', function(){
        var obj = $(this);
        var id = obj.attr('data-id');
        var type = $("#type").val();
        var parent_id = 0;
        var parent_name = '';
        if(obj.parents('.reply-main').find('.at').length > 0){
            parent_id = obj.parents('.reply-main').find('.at').attr('data-id');
            parent_name = obj.parents('.reply-main').find('.at').attr('data-name');
        }

        var content = $.trim(obj.parents('.textarea-wrapper').children('.edit-p').html()) ;
        if(content == ''){
            alert_msg('请填写评论');
            return false;
        }

        if(is_has_class(this)) return false;

        $.ajax({
            type:'POST',
            data:{
                "id":id,'content':content,'parent_id':parent_id,'parent_name':parent_name,'type':type
            },
            url:'/reply/save',
            dataType:'json',
            success:function(result){
                if(result.status == 'error'){
                    alert_msg(result.msg);
                    return false;
                }
                alert_msg(result.msg , 'success');
                if($('.detail-reply').length > 0){
                    //详情页的评论
                    get_detail_reply_list();
                }else{
                    //普通列表页的评论，评论成功加一个DIV，点击close-reply时会统计reply-section的数量
                    obj.parents('.reply-main').append('<div class="reply-section display"></div>');
                    obj.parents('.reply-main').find('.close-reply').trigger("click");
                }
            },
            error:function (){
                alert_msg('提交失败,请刷新重试');
            }
        })
        click_remove_class(this);
    });

    function reply_list(result){
        var html = '<div class="reply-wrapper"><hr class="hr-reply"><div class="reply-main">';
        if(result.data.list != ''){
            html += '<div class="reply-title">评论</div>';
            $.each(result.data.list, function(k, v){
                html += '<div class="reply-section rep-id-'+v.rep_id+'">';
                html += '<div class="reply-avatar"><img src="'+v.avatar+'" onerror="reply_avatar(this)" /></div>';
                html += '<div class="reply-right">';
                html += '<div class="reply-right-top"><div  class="reply-user-name">'+v.name+'</div>';
                if(v.parent_id != 0 && v.parent_name != '' && v.reply_content != ''){
                    html += '<div  class="reply-to-reply" rep-id="'+ v.parent_id+'"><div class="reply-to-user">回复 '+v.parent_name+'</div>';
                    html += '<div class="reply-reply-content"><p class="reply-to-user">'+ v.reply_content.name;
                    html += '&nbsp;&nbsp;&nbsp;'+v.reply_content.create_time+'</p>'+ v.reply_content.content+'</div>';
                    html += '</div>';
                }
                html += '</div><p class="reply-content">'+v.content+'</p>';
                html += '<p class="reply-bottom">';
                html += '<span class="reply-createtime">'+v.create_time+'</span>';
                html += '<span class="reply-ta" data-id="'+ v.rep_id+'" data-name="'+ v.name+'">回复</span>';
                html += '<a class="oo" data-id="'+v.rep_id+'">OO</a>[<span class="good">'+v.good+'</span>]';
                html += '<a class="xx" data-id="'+v.rep_id+'">XX</a>[<span class="bad">'+v.bad+'</span>]';
                html += '<span class="response"></span>';
                html += '</p></div>';
                html += '</div>';
            });
        }else{
            html += '<div class="reply-title">还没有评论</div>';
        }

        if(result.data.is_login == 1){
            html += '<div class="reply-comment">';
            html += '<p><span>'+result.data.name+'</span><span class="qq-face"></span></p>';
            html += '<div class="reply-avatar"><img src="'+result.data.avatar+'" /></div>';
            html += '<div class="textarea-wrapper">';
            html += '<p class="edit-p" contenteditable="true"></p>';
            html += '<p class="post-toolbar"><button data-id="'+result.data.con_id+'" class="reply-submit ds-post-button">发布</button></p>';
            html += '</div></div><p class="close-reply">[X]关闭评论</p></div>';
        }else{
            html += '<div class="reply-no-login">';
            html += '<span onclick="login()">&nbsp;登录&nbsp;</span>后才能评论';
            html += '<p class="close-reply">[X]关闭评论</p></div>';
        }
        return html;
    }

    function reply_one(){

    }


})