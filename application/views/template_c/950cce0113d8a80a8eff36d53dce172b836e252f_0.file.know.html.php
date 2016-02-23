<?php
/* Smarty version 3.1.29, created on 2016-02-23 02:13:22
  from "D:\work\fanfan\application\views\know.html" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56cbc042ea42f3_05598379',
  'file_dependency' => 
  array (
    '950cce0113d8a80a8eff36d53dce172b836e252f' => 
    array (
      0 => 'D:\\work\\fanfan\\application\\views\\know.html',
      1 => 1456193600,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56cbc042ea42f3_05598379 ($_smarty_tpl) {
?>
<div class="main left">
    <?php echo $_smarty_tpl->tpl_vars['page']->value;?>

    <?php
$_from = $_smarty_tpl->tpl_vars['list']->value;
if (!is_array($_from) && !is_object($_from)) {
settype($_from, 'array');
}
$__foreach_one_0_saved_item = isset($_smarty_tpl->tpl_vars['one']) ? $_smarty_tpl->tpl_vars['one'] : false;
$_smarty_tpl->tpl_vars['one'] = new Smarty_Variable();
$_smarty_tpl->tpl_vars['one']->_loop = false;
foreach ($_from as $_smarty_tpl->tpl_vars['one']->value) {
$_smarty_tpl->tpl_vars['one']->_loop = true;
$__foreach_one_0_saved_local_item = $_smarty_tpl->tpl_vars['one'];
?>
    <div class="one" data-id="<?php echo $_smarty_tpl->tpl_vars['one']->value['con_id'];?>
">
        <div class="left">
            <p class="name" title="<?php echo $_smarty_tpl->tpl_vars['one']->value['u_name'];?>
"><?php echo $_smarty_tpl->tpl_vars['one']->value['name'];?>
</p>
            <p class="time"><?php echo $_smarty_tpl->tpl_vars['one']->value['create_time'];?>
</p>
        </div>
        <div class="left second">
            <p><?php echo $_smarty_tpl->tpl_vars['one']->value['content'];?>
</p>
        </div>
        <p class="right clear click">
            <span class="response"></span>
            <a class="oo">oo</a>(<span class="good"><?php echo $_smarty_tpl->tpl_vars['one']->value['good'];?>
</span>)
            <a class="xx">xx</a>(<span class="bad"><?php echo $_smarty_tpl->tpl_vars['one']->value['bad'];?>
</span>)
        </p>
    </div>
    <?php
$_smarty_tpl->tpl_vars['one'] = $__foreach_one_0_saved_local_item;
}
if ($__foreach_one_0_saved_item) {
$_smarty_tpl->tpl_vars['one'] = $__foreach_one_0_saved_item;
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
    sub_cfg.requestUrl = '/know/save';
    sub_cfg.success = function(result){
        window.location.href='http://fanfan.com/know'
    };

    $("#submit").click(function(){
        var name = $("#name").val();
        var email = $("#email").val();
        var content = $("#content").val();
        content = content. replace(/\n/g,'<br/>'); //换行
        $.cookie('name', name , { path: '/', expires: 5*365*24*60*60 });
        $.cookie('email', email , { path: '/', expires: 5*365*24*60*60 });
        sub_cfg.data = {
            "name":name,"email":email,'content':content
        };
        ajax_res(sub_cfg);
    })


    $(".oo").click(function(){
        var url = '/know/comment';
        click_good(url,this);
    })

    $(".xx").click(function(){
        var url = '/know/comment';
        click_bad(url,this);
    })
<?php echo '</script'; ?>
>
<?php }
}
