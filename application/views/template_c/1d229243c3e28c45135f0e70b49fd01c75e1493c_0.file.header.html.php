<?php
/* Smarty version 3.1.29, created on 2016-02-26 04:51:46
  from "D:\work\fanfan\application\views\header.html" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_56cfd9e2c918a8_89951281',
  'file_dependency' => 
  array (
    '1d229243c3e28c45135f0e70b49fd01c75e1493c' => 
    array (
      0 => 'D:\\work\\fanfan\\application\\views\\header.html',
      1 => 1456462304,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_56cfd9e2c918a8_89951281 ($_smarty_tpl) {
?>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="robots" content="all" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/resources/css/common.css"/>
    <?php echo '<script'; ?>
 src="/resources/js/jquery.js"><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 src="/resources/js/jquery.cookie.js"><?php echo '</script'; ?>
>
    <meta name="keywords" content="<?php echo $_smarty_tpl->tpl_vars['keywords']->value;?>
" />
    <meta name="description" content="<?php echo $_smarty_tpl->tpl_vars['description']->value;?>
" />
    <title><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</title>
</head>
<body>
<div class="nav clear">
    <ul>
        <li><a href="/wl">无聊图</a></li>
        <li><a href="/joke">段子</a></li>
        <li><a href="/meizi">妹子</a></li>
        <li><a href="/know">小知士</a></li>
        <li><a href="/wen">美文</a></li>
        <li><a href="/zzs">渣渣说</a></li>
        <li><a href="/myth">神话</a></li>
    </ul>
</div>
<div class="wapper <?php echo $_smarty_tpl->tpl_vars['body']->value;?>
"><?php }
}
