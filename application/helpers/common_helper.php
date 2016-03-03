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
/*
 * 得到IP地址
 */
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

function valid_name($name){
    if(empty($name)) splash('error','请填写昵称');
    if(utf8_strlen($name) > 20 || utf8_strlen($name) < 3) splash('error','昵称长度3-20个字符');
}

function valid_email($email){
    if(empty($email)) splash('error','请填写email');
    $pattern = "/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";
    if ( !preg_match( $pattern, $email ) ) splash('error','email格式不正确');
}

function valid_mobile($mobile){
    if(empty($mobile)) splash('error','手机号不能为空');
    if(!preg_match("/1[34578]{1}\d{9}$/",$mobile)){
        splash('error','请输入正确手机号');
    }
}

function valid($name = '' ,$email='' ,$content = ''){
    valid_name($name);
    valid_email($email);
    if(empty($content)) splash('error','请填写内容');
}

function register_valid($data){
    $email = $data['email'];
    $code  = $data['code'];
    $password = $data['password'];
    $confirm = $data['confirm'];

    if(empty($_SESSION['code'])) splash('error','验证码已过期');
    if(empty($code) || strtolower($code) != strtolower($_SESSION['code'])) splash('error','验证码不正确');

    valid_email($email);

    if(empty($password)) splash('error','请填写密码');
    if(strlen($password) > 30 || strlen($password) < 6) splash('error','密码长度6-30个字符');

    if(empty($confirm)) splash('error','请确认密码');
    if($confirm != $password) splash('error','前后密码不一致');
}

/*
 * 转化时间
 */
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
/*
 * 是否登陆
 */
function is_login(){
    if(empty($_SESSION['user_id'])) return false;
    if(!empty($_COOKIE['is_login']) && $_COOKIE['is_login'] == 1){
       return true;
    }
    return false;
}
/*
 * 设置COOKIE
 */
function my_set_cookie($key,$value){
    setcookie($key,$value,time()+COOKIE_EXPIRE , '/');
}
/*
 * COOKIE过期
 */
function expire_cookie($key){
    setcookie($key,'',time(),'/');
}
/*
 * 计算中文字符串长度
 */
function utf8_strlen($string = '') {
    // 将字符串分解为单元
    preg_match_all("/./us", $string, $match);
    // 返回单元个数
    return count($match[0]);
}

function my_send_email($to = '929632454@qq.com',$title = '',$content = '')
{
    $email_name = EMAIL_NUMBER ;
    $email_pass = EMAIL_PASSWORD ;

    $config['protocol'] = 'smtp';
    $config['smtp_host'] = 'smtp.163.com';
    $config['smtp_user'] = $email_name;//这里写上你的163邮箱账户
    $config['smtp_pass'] = $email_pass;//这里写上你的163邮箱密码
    $config['mailtype'] = 'html';
    $config['validate'] = true;
    $config['priority'] = 1;
    $config['crlf']  = "\r\n";
    $config['smtp_port'] = 25;
    $config['charset'] = 'utf-8';
    $config['wordwrap'] = TRUE;

    require_once(BASEPATH.'libraries/Email.php');
    $email = new CI_Email();
    $email->initialize($config);

    $email->from($email_name);//发件人
    $email->to($to);  //收件人
    $email->subject($title);
    $email->message($content);
    return $email->send();
}

function get_email_content($user_id,$email){
    $data = array('user_id'=>$user_id,'email'=>$email,'time'=>time());
    $url = "http://".$_SERVER['HTTP_HOST'].'/user/validate?param='.base64_encode(json_encode($data));
    return '<p>请点击以下链接激活账号，24小时有效</p><p><a target="_blank" href="'.$url.'"></a>'.$url.'</p>';
}

function header_index($url = ''){
    header("Location: /".$url);
    exit;
}