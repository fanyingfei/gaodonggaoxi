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
            if (!preg_match("/^(10|172\.16|192\.168)\./", $ips[$i])) {
                $ip = $ips[$i];
                break;
            }
        }
    }
    return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
}

function valid_name($name){
    if(empty($name)) splash('error','请填写昵称');
    if(utf8_strlen($name) > 20 || utf8_strlen($name) < 2) splash('error','昵称长度2-20个字符');
    if(is_numeric($name)) splash('error','昵称不能全为数字');
}

function is_email($email){
    if(empty($email)) return false;
    $pattern = "/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";
    if ( !preg_match( $pattern, $email ) ) return false;
    return true;
}

function valid_email($email){
    if(empty($email)) splash('error','请填写email');
    $pattern = "/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";
    if ( !preg_match( $pattern, $email ) ) splash('error','email格式不正确');
}

function is_mobile($mobile){
    if(empty($mobile)) return false;
    if(!preg_match("/1[34578]{1}\d{9}$/",$mobile)) return false;
    return true;
}

function valid_mobile($mobile){
    if(empty($mobile)) splash('error','手机号不能为空');
    if(!preg_match("/1[34578]{1}\d{9}$/",$mobile)){
        splash('error','请输入正确手机号');
    }
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
        $str = '';
    }
    return $str;
}
/*
 * 是否登陆
 */
function is_login(){
    if(empty($_SESSION['user_id']) || empty($_SESSION['email']) || empty($_SESSION['name'])) return false;
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
    $url = "http://".$_SERVER['HTTP_HOST'].'/user/validate/'.base64_encode(json_encode($data));
    return '<p>请点击以下链接激活账号，24小时有效</p><p><a target="_blank" href="'.$url.'"></a>'.$url.'</p>';
}

function header_index($url = '/'){
    if(empty($url)) $url = '/';
    header("Location: ".$url);
    exit;
}

/*
 * 处理内容，去掉多余<br>
 */
function filter_content_br($str){
    $str = preg_replace('/(<br\s*\/?>)+$/i','',$str);
    $str = preg_replace('/^(<br\s*\/?>)+/i','',$str);
    return str_replace('div><br><div','div><div',$str);
}

/*
 * 得到用户user_sn
 */
function get_user_sn($user_id,$time){
    $c_time = empty($time) ? date('Ymd') : date('Ymd',strtotime($time));
    return $c_time.$user_id;
}

/*
    * 处理新浪上传GIF图
    */
function gif_static_gif($content , $flag = 0){
    $img_preg = "/<img([^>]*)\s*src=('|\")([^'\"]+)('|\")/";
    if(!preg_match_all($img_preg , $content , $img_data)) return false;

    foreach($img_data[3] as $key=>$v){
        $result[$key]['src_url'] = $v;
        $result[$key]['total_img'] = $img_data[0][$key].'>';
    }

    $original = $new_img = array();
    foreach($result as $v){
        $src_url = $v['src_url'];  //图片URL
        $total_img = $v['total_img'];  //全部img标签信息
        $separate = explode('/' , $src_url);
        $img_name = end($separate);  //图处名称，无路径
        $img_domain = 'http://'.$separate[2];  //域名
        //图片URL不包含本域名
        if(strpos($src_url,$_SERVER['HTTP_HOST']) === false){
            //新浪域名可能会出现 ttp://ww4.sinaimg.cn 和 http://ww1.sinaimg.cn
            if(strpos($src_url,'.sinaimg.cn') !== false ){
                $small_url = $img_domain.'/small/'.$img_name;
            }else{
                $small_url = '/resources/images/gray.png';
            }
            $original[] = $total_img;
            if(substr($img_name , -4 , 4) == '.gif' && $flag == 0){
                $src = '<div class="peripheral"><img class="sina-show-gif" src="'.$small_url.'" ori-data="'.$src_url.'"  />';
                $src .= '<div class="play">PLAY</div></div>';
            }else{
                $src = '<div class="peripheral"><img class="sina-show" src="'.$src_url.'"  ori-data="'.$src_url.'"  /></div>';
            }
            $new_img[] = $src;
        }
    }

    if(!empty($original)){
        return str_replace($original , $new_img , $content);
    }else{
        return false;
    }
}

function get_detail_url($id,$time){
    return '/detail/'.date('Ymd',strtotime($time)).'/content_'.$id.'.html';
}

function get_detail_id($str){
    return str_replace(array('content_','.html'),'',$str);
}

function my_array_column($input, $columnKey, $indexKey=null){
    if(!function_exists('array_column')){
        $columnKeyIsNumber  = (is_numeric($columnKey))?true:false;
        $indexKeyIsNull            = (is_null($indexKey))?true :false;
        $indexKeyIsNumber     = (is_numeric($indexKey))?true:false;
        $result                         = array();
        foreach((array)$input as $key=>$row){
            if($columnKeyIsNumber){
                $tmp= array_slice($row, $columnKey, 1);
                $tmp= (is_array($tmp) && !empty($tmp))?current($tmp):null;
            }else{
                $tmp= isset($row[$columnKey])?$row[$columnKey]:null;
            }
            if(!$indexKeyIsNull){
                if($indexKeyIsNumber){
                    $key = array_slice($row, $indexKey, 1);
                    $key = (is_array($key) && !empty($key))?current($key):null;
                    $key = is_null($key)?0:$key;
                }else{
                    $key = isset($row[$indexKey])?$row[$indexKey]:0;
                }
            }
            $result[$key] = $tmp;
        }
        return $result;
    }else{
        return array_column($input, $columnKey, $indexKey);
    }
}

function get_ip_local($queryIP){
    $url = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='.$queryIP;
    $ch = curl_init($url);
    //curl_setopt($ch,CURLOPT_ENCODING ,'utf8');
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true) ; // 获取数据返回
    $location = curl_exec($ch);
    $location = json_decode($location);
    curl_close($ch);

    $loc = "";
    if($location===FALSE) return "";
    if (empty($location->desc)) {
        $loc = $location->province.'&nbsp;'.$location->city.'&nbsp;'.$location->district.'&nbsp;'.$location->isp;
    }else{
        $loc = $location->desc;
    }
    return $loc;
}

/*
 * 是否爬虫
 */
function isCrawler(){
    $userAgent = strtolower($_SERVER['HTTP_USER_AGENT']);
    $spiders   = array(
        'Googlebot', // Google 爬虫
        'Baiduspider', // 百度爬虫
        'Yahoo! Slurp', // 雅虎爬虫
        'YodaoBot', // 有道爬虫
        'msnbot' // Bing爬虫
        // 更多爬虫关键字
    );
    foreach($spiders as $spider){
        $spider = strtolower($spider);
        if(strpos($userAgent, $spider) !== false) return true;
    }
    return false;
}