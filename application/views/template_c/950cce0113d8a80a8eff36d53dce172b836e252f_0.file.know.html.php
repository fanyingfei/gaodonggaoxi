<?php
/* Smarty version 3.1.29, created on 2016-02-23 13:24:36
  from "D:\work\fanfan\application\views\know.html" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56cc5d94b1c7c9_72861117',
  'file_dependency' => 
  array (
    '950cce0113d8a80a8eff36d53dce172b836e252f' => 
    array (
      0 => 'D:\\work\\fanfan\\application\\views\\know.html',
      1 => 1456233568,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56cc5d94b1c7c9_72861117 ($_smarty_tpl) {
?>
<div class="main left">
    <div class="title"><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</div>
    <div class="depict">介绍一些生活小常识</div>
    <div class="total">
        <span class="left">总数：<?php echo $_smarty_tpl->tpl_vars['count']->value;?>
</span>
        <span id="mao" class="right cursor time"><?php if ($_smarty_tpl->tpl_vars['name']->value) {
echo $_smarty_tpl->tpl_vars['name']->value;?>
，想说些什么呢？<?php } else { ?>来说些什么吧<?php }?></span>
    </div>
    <?php if (count($_smarty_tpl->tpl_vars['list']->value) > 5) {
echo $_smarty_tpl->tpl_vars['page']->value;
}?>
    <?php
$_from = $_smarty_tpl->tpl_vars['list']->value;
if (!is_array($_from) && !is_object($_from)) {
settype($_from, 'array');
}
$__foreach_one_0_saved_item = isset($_smarty_tpl->tpl_vars['one']) ? $_smarty_tpl->tpl_vars['one'] : false;
$__foreach_one_0_saved_key = isset($_smarty_tpl->tpl_vars['key']) ? $_smarty_tpl->tpl_vars['key'] : false;
$_smarty_tpl->tpl_vars['one'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['key'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['one']->_loop = false;
foreach ($_from as $_smarty_tpl->tpl_vars['key']->value => $_smarty_tpl->tpl_vars['one']->value) {
$_smarty_tpl->tpl_vars['one']->_loop = true;
$__foreach_one_0_saved_local_item = $_smarty_tpl->tpl_vars['one'];
?>
    <div class="one <?php if ($_smarty_tpl->tpl_vars['key']->value == 0) {?>first<?php }?>">
        <div class="user">
            <p class="name" title="<?php echo $_smarty_tpl->tpl_vars['one']->value['u_name'];?>
"><?php echo $_smarty_tpl->tpl_vars['one']->value['name'];?>
</p>
            <p class="time"><?php echo $_smarty_tpl->tpl_vars['one']->value['create_time'];?>
</p>
        </div>
        <div class="content">
            <p><?php echo $_smarty_tpl->tpl_vars['one']->value['content'];?>
</p>
        </div>
        <p class="right clear click">
            <span class="response"></span>
            <a class="oo" data-id="<?php echo $_smarty_tpl->tpl_vars['one']->value['con_id'];?>
">oo</a>[<span class="good"><?php echo $_smarty_tpl->tpl_vars['one']->value['good'];?>
</span>]
            <a class="xx" data-id="<?php echo $_smarty_tpl->tpl_vars['one']->value['con_id'];?>
">xx</a>[<span class="bad"><?php echo $_smarty_tpl->tpl_vars['one']->value['bad'];?>
</span>]
        </p>
    </div>
    <?php
$_smarty_tpl->tpl_vars['one'] = $__foreach_one_0_saved_local_item;
}
if ($__foreach_one_0_saved_item) {
$_smarty_tpl->tpl_vars['one'] = $__foreach_one_0_saved_item;
}
if ($__foreach_one_0_saved_key) {
$_smarty_tpl->tpl_vars['key'] = $__foreach_one_0_saved_key;
}
?>

    <?php echo $_smarty_tpl->tpl_vars['page']->value;?>


    <div class="sub">
        <p>昵称：<input type="text" name="name" id="name" value="<?php echo $_smarty_tpl->tpl_vars['name']->value;?>
" /></p>
        <p>邮箱：<input type="text" name="email" id="email" value="<?php echo $_smarty_tpl->tpl_vars['email']->value;?>
" /></p>
        <p><textarea name="content" id="content"></textarea></p>
        <p><button id="submit" class="clear">提交</button></p>
    </div>
</div>
<?php echo '<script'; ?>
 src="/resources/js/jquery.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 src="/resources/js/common.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 src="/resources/js/jquery.cookie.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
>
    var sub_cfg = {};
    var comment_url = '/know/comment';
    sub_cfg.requestUrl = '/know/save';
    sub_cfg.success = function(result){
        window.location.href='/know'
    };

    $("#submit").click(function(){
        var name = $.trim($("#name").val());
        var email = $.trim($("#email").val());
        var content = $.trim($("#content").val());
        content = content. replace(/\n/g,'<br/>'); //换行
        if(!valid(name,email,content)){
            return false;
        }
        $.cookie('name', name ,  { expires: 365 });
        $.cookie('email', email ,  { expires: 365 });
        sub_cfg.data = {
            "name":name,"email":email,'content':content
        };
        ajax_res(sub_cfg);
    })


    $(".oo").click(function(){
        click_good(comment_url,this);
    })

    $(".xx").click(function(){
        click_bad(comment_url,this);
    })
<?php echo '</script'; ?>
>
<?php }
}
