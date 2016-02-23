<?php

function get_page($count,$limit,$p,$func='href'){
    $obj = new CI_Page($count,$limit,$p,$func);
    return $obj->echoPageAsDiv();
}

function splash($status,$msg,$data=''){
    if(empty($data)){
        $data = '';
    }
    $arr = array('status'=>$status,'msg'=>$msg,'data'=>$data);

    ajax_response(json_encode($arr));
}

function ajax_response($response){

    if(is_array($response))$response = json_encode($response);

    if(!empty($_REQUEST['jsonpcallback'])){
        header('content-type:text/javascript;charset＝utf-8');
        $response = $_REQUEST['jsonpcallback']."(".$response.")";
    }

    die($response);
}

function get_real_ip(){
    $ip=false;
    if(!empty($_SERVER["HTTP_CLIENT_IP"])){
        $ip = $_SERVER["HTTP_CLIENT_IP"];
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode (", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
        if ($ip) { array_unshift($ips, $ip); $ip = FALSE; }
        for ($i = 0; $i < count($ips); $i++) {
            if (!eregi ("^(10|172\.16|192\.168)\.", $ips[$i])) {
                $ip = $ips[$i];
                break;
            }
        }
    }
    return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
}

function valid($name = '' ,$email='' ,$content = ''){
    if(empty($name)) splash('error','请填写昵称');
    if(empty($email)) splash('error','请填写email');
    $pattern = "/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";
    if ( !preg_match( $pattern, $email ) ) splash('error','email格式不正确');
    if(empty($content)) splash('error','请填写内容');
}

function valid_msg($name = '' ,$email='' , $title='' , $content = ''){
    if(empty($name)) error_msg('请填写昵称');
    if(empty($email)) error_msg('请填写email');
    if(empty($title)) error_msg('标题不能为空');
    $pattern = "/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";
    if ( !preg_match( $pattern, $email ) ) error_msg('email格式不正确');
    if(empty($content)) error_msg('请填写内容');
}

function error_msg($msg){
    echo $msg;exit;
}