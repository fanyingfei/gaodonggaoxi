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
    if(strlen($name) > 15) splash('error','昵称过长');

    if(empty($email)) splash('error','请填写email');
    $pattern = "/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";
    if ( !preg_match( $pattern, $email ) ) splash('error','email格式不正确');

    if(empty($content)) splash('error','请填写内容');
}

function register_valid($data){
    $email = $data['email'];
    $name = $data['name'];
    $code  = $data['code'];
    $password = $data['password'];
    $confirm = $data['confirm'];

    if(empty($_SESSION['code'])) splash('error','验证码已过期');
    if(empty($code) || strtolower($code) != strtolower($_SESSION['code'])) splash('error','验证码不正确');

    if(empty($name)) splash('error','请填写昵称');
    if(strlen($name) > 20 || strlen($name) < 3) splash('error','昵称长度3-20个字符');

    if(empty($email)) splash('error','请填写email');
    $pattern = "/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";
    if ( !preg_match( $pattern, $email ) ) splash('error','email格式不正确');

    if(empty($password)) splash('error','请填写密码');
    if(strlen($password) > 50 || strlen($password) < 6) splash('error','密码长度6-50个字符');

    if(empty($confirm)) splash('error','请确认密码');
    if($confirm != $password) splash('error','前后密码不一致');
}

function get_type(){
    $self   = explode('/',$_SERVER['PHP_SELF']);
    if(empty($self[2])) return 1;
    $data = array('xian'=>1 ,'know'=>2 ,'wen'=>3,'zzs'=>4,'meizi'=>5,'myth'=>6);
    return empty($data[$self[2]]) ? 1 :  $data[$self[2]];
}

function change_time($time) {
    $time = (int) substr(strtotime($time), 0, 10);
    $int = time() - $time;
    $str = '';
    if ($int <= 2){
        $str = sprintf('刚刚', $int);
    }elseif ($int < 60){
        $str = sprintf('%d秒前', $int);
    }elseif ($int < 3600){
        $str = sprintf('%d分钟前', floor($int / 60));
    }elseif ($int < 86400){
        $str = sprintf('%d小时前', floor($int / 3600));
    }elseif ($int < 2592000){
        $str = sprintf('%d天前', floor($int / 86400));
    }else{
        $str = date('Y-m-d H:i:s', $time);
    }
    return $str;
}

function is_login(){
    if(empty($_SESSION['user_id'])) return false;
    if(!empty($_COOKIE['is_login']) && $_COOKIE['is_login'] == 1){
       return true;
    }
    return false;
}

function my_set_cookie($key,$value){
    setcookie($key,$value,time()+COOKIE_EXPIRE , '/');
}

function expire_cookie($key){
    setcookie($key,'',time(),'/');
}