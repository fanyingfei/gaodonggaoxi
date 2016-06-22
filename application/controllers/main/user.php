<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends MY_Controller  {
	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */

    public function __construct() {
        parent::__construct();
        $this->load->model('Model_users');
    }

    public function login_index($param=''){
        if(is_login()) header_index();
        $url = empty($_SERVER['HTTP_REFERER']) ? '/' : $_SERVER['HTTP_REFERER'];
        if(strpos($url,'user') || strpos($url,'login') || strpos($url,'register')) $url = '/';

        $this->assign('url',$url);
        $this->assign('title','登录');
        $this->native_display('user/header.html');
        $this->native_display('user/login.html');
    }

    /*
     * 登陆
     */
    public function login_in(){
        if(is_login()) splash('success','登陆成功');
        $account = trim(strip_tags($_REQUEST['account']));
        $password = trim(strip_tags($_REQUEST['password']));

        if(empty($account)) splash('error','账号不存在');

        if(is_email($account)){
            $where = "where email = '$account' and is_validate = 1";
        }else{
            $where = "where name = '$account'";
        }
        $one = $this->model_users->GetRow($where);

        if(empty($one)) splash('error','账号不存在');
        if($one['password'] != md5($password.ENCRYPTION)) splash('error','密码不正确');

        $this->set_user_login($one);

        $url = trim($_REQUEST['referer_url']);
        splash('success','登陆成功',array('url'=>empty($url) ? '/' : $url));
    }

    public function bind(){
        $this->assign('title','账号绑定');
        $this->native_display('user/header.html');
        $this->native_display('user/bind.html');
    }

    public function bind_save(){
        $name = $_REQUEST['name'];
        if(empty($name)) splash('error','请输入账号');
        $password = $_REQUEST['password'];
        if(empty($password)) splash('error','请输入密码');

        $where = "where name = '$name'";
        $one = $this->model_users->GetRow($where);
        if(empty($one)) splash('error','您要绑定的账号不存在');
        if($one['password'] != md5($password.ENCRYPTION)) splash('error','密码不正确');
        if(empty($one['is_validate']) || empty($one['name'])) splash('error','请先激活账号');

        if(!empty($_SESSION['third_type']) && $_SESSION['third_type']=='qq'){
            if(empty($_SESSION['openid'])) splash('error','绑定失败，请重新登录');
            $access_token = $_SESSION['access_token'];
            $data['qq_id'] = $openid = $_SESSION['openid'];
            $url = 'https://graph.qq.com/user/get_user_info?access_token='.$access_token.'&oauth_consumer_key='.APP_ID.'&openid='.$openid;
            $user_info = file_get_contents($url);
            $data['qq_id'] = $openid;
            if(!empty($user_info)){
                $user_info = json_decode($user_info,true);
                if(!empty($user_info['gender']) && $one['sex'] == 'U'){
                    $sex_array = array_flip($this->sex_data);
                    $data['sex'] = empty($sex_array[$user_info['gender']]) ? 'U' : $sex_array[$user_info['gender']];
                }
                if(!empty($user_info['year']) && empty($one['year'])) $data['year'] = $user_info['year'];
                if(!empty($user_info['figureurl_2']) && empty($one['avatar'])) $data['avatar'] = $user_info['figureurl_2'];
            }
        }elseif(!empty($_SESSION['third_type']) && $_SESSION['third_type']=='wb'){
            if(empty($_SESSION['openid'])) splash('error','绑定失败，请重新登录');
            $access_token = $_SESSION['access_token'];
            $data['wb_id'] = $sina_id = $_SESSION['openid'];
            $url = 'https://api.weibo.com/2/users/show.json?access_token='.$access_token.'&uid='.$sina_id;
            $user_info = file_get_contents($url);
            if(!empty($user_info)){
                $user_info = json_decode($user_info,true);
                if(!empty($user_info['gender']) && $one['sex'] == 'U'){
                    $sex_array = array('m'=>'M','f'=>'W');
                    $data['sex'] = empty($sex_array[$user_info['gender']]) ? 'U' : $sex_array[$user_info['gender']];
                }
                if(!empty($user_info['avatar_hd']) && empty($one['avatar'])) $data['avatar'] = $user_info['avatar_hd'];
            }
        }elseif(!empty($_SESSION['third_type']) && $_SESSION['third_type']=='wx'){

        }

        $this->model_users->Update(array('user_id'=>$one['user_id']),$data);
        $this->set_user_login($one);
        splash('success','绑定成功');
    }

    public function login_qq($params){
        if(strpos($params,'code=') === false) $this->error_msg('QQ登陆失败');
        $code = str_replace('code=','',$params);
        $url = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id='.APP_ID.
            '&client_secret='.APP_KEY.'&code='.$code.'&redirect_uri='.REDIRECT_URL_QQ ;
        $access_token_res = file_get_contents($url);
        if(empty($access_token_res)) $this->error_msg('QQ登陆失败');
        $access_token_array = deal_str_param($access_token_res);
        $access_token = $access_token_array['access_token'];
        $url = 'https://graph.qq.com/oauth2.0/me?access_token='.$access_token;
        $openid_res = file_get_contents($url);
        if(empty($openid_res)) $this->error_msg('QQ登陆失败');
        if(preg_match('/"openid":"(.*?)"}/', $openid_res , $matches)){
            $openid = $matches[1];
        } else {
            $this->error_msg('QQ登陆失败');
        }

        $this->login_third('qq',$openid,$access_token);
    }

    public function login_wb($params){
        if(strpos($params,'code=') === false) $this->error_msg('微博登陆失败');
        $code = str_replace('code=','',$params);
        $url = 'https://api.weibo.com/oauth2/access_token';
        $data = array(
            'code'             => $code,
            'client_id'        => SINA_ID ,
            'client_secret'    => SINA_KEY ,
            'redirect_uri'     => REDIRECT_URL_WB ,
            'grant_type'       => "authorization_code"
        );
        $access_token_res = post_fsockopen($url,$data);
        if(empty($access_token_res)) $this->error_msg('微博登陆失败');
        $sina_res = json_decode($access_token_res,true);
        if(empty($sina_res['uid'])) $this->error_msg('微博登陆失败');

        $this->login_third('wb',$sina_res['uid'],$sina_res['access_token']);
    }

    public function login_wx($params){
        print_r($params);exit;
    }

    public function login_third($type,$id,$key){
        if($type=='qq'){
            $where = "where qq_id = '$id'";
        }elseif($type=='wb'){
            $where = "where wb_id = '$id'";
        }elseif($type=='wx'){
            $where = "where wx_id = '$id'";
        }
        $one = $this->model_users->GetRow($where);
        if(empty($one)){
            $_SESSION['openid'] = $id;
            $_SESSION['third_type'] = $type;
            $_SESSION['access_token'] = $key;
            header_index('/user/bind');
        }else{
            $this->set_user_login($one);
            header_index();
        }
    }


    public function login_out(){
        session_destroy();
        cookie_expire('is_login');
        $url = empty($_SERVER['HTTP_REFERER']) ? '/' : $_SERVER['HTTP_REFERER'];
        if(strpos($url,'user') || strpos($url,'login') || strpos($url,'register') || strpos($url,'admin')) $url = '/';
        header_index($url);
    }

    public function register($param=''){
        $this->assign('title','注册');
        $this->native_display('user/header.html');
        $this->native_display('user/register.html');
    }

    public function register_save(){
        //是否拉入黑名单
        $this->is_black();

        $data['email'] = $email = trim(strip_tags($_REQUEST['email']));
        $data['name'] = $name = trim(strip_tags($_REQUEST['name']));
        $data['code'] = $code = trim(strip_tags($_REQUEST['code']));
        $data['password'] = trim(strip_tags($_REQUEST['password']));
        $data['confirm'] = trim(strip_tags($_REQUEST['confirm']));

        register_valid($data);

        unset($data['confirm']);
        unset($data['code']);

        $where = "where name = '$name'";
        $res_by_name = $this->model_users->GetRow($where);
        if(!empty($res_by_name)) splash('error','该昵称已经被注册，不可使用');

        $where = "where email = '$email' and is_validate = 1";
        $res_by_email = $this->model_users->GetRow($where);
        if(!empty($res_by_email)) splash('error','该邮箱已经被注册，不可使用');

        $data['password'] = md5($data['password'].ENCRYPTION);
        $data['create_time'] = date('Y-m-d H:i:s');
        $data['ip'] = get_real_ip();
        $data['user_id'] = $this->model_users->Save($data);

        if($data['user_id']){
            $this->set_user_login($data);
            splash('success','注册成功');
        }else{
            splash('error','注册失败,请重试');
        }
    }

    /*
     * 激活账号，填昵称页面
     */
    public function user_validate($str){
        $param = json_decode(base64_decode($str),true);

        $time = $param['time'];
        if(time() - $time > 86400){
            $this->error_msg('链接已失效');
        }
        $user_id = intval($param['user_id']);
        if(empty($user_id)) $this->error_msg('出错啦');

        $where = "where user_id = '$user_id'";
        $user_info = $this->model_users->GetRow($where);
        if(empty($user_info) || $user_info['email'] != $param['email']){
            $this->error_msg('出错啦');
        }
        if(!empty($user_info['is_validate']) && !empty($user_info['name'])){
            header_index('/login');
        }
        $this->model_users->Update(array('user_id'=>$user_id),array('is_validate'=>1));
        $this->assign('title','邮箱验证');
        $this->native_display('user/header.html');
        $this->native_display('user/valid_email.html');
    }

    public function nick_save(){
        $id = intval($_REQUEST['id']);
        $name = trim(strip_tags($_REQUEST['name']));

        if(empty($id)) splash('error','激活失败，请刷新重试');
        valid_name($name);

        $where = "where user_id = $id";
        $user_info = $this->model_users->GetRow($where);
        if(empty($user_info)) splash('error','激活失败，请刷新重试');

        if(!empty($user_info['name']) && !empty($user_info['is_validate'])){
            splash('error','该账号已激活，请直接登陆');
        }

        $where = "where name = '$name'";
        $res_by_name = $this->model_users->GetRow($where);
        if(!empty($res_by_name) && $res_by_name['user_id'] != $id) splash('error','该昵称已被注册，不可使用');
        $res = $this->model_users->UpdateByKey($id,array('name'=>$name,'is_validate'=>1));
        if($res){
            $user_info['name'] = $name;
            $this->set_user_login($user_info);
            splash('sucess','激活成功，立即登录');
        }else{
            splash('error','激活失败,请重试');
        }
    }

    public function set_user_login($one){
        $this->model_users->UpdateByKey($one['user_id'],array('last_login'=>date('Y-m-d H:i:s'),'ip'=>get_real_ip()));
        $_SESSION['user_id'] = $one['user_id'];
        $_SESSION['email'] = $one['email'];
        $_SESSION['name'] = $one['name'];
        $_SESSION['is_admin'] = empty($one['is_admin']) ? 0 : $one['is_admin'];
        $_SESSION['permission'] = empty($one['permission']) ? '' : $one['permission'];
        if(!empty( $one['avatar'])) $_SESSION['avatar'] = $one['avatar'];

        my_set_cookie('is_login',1);
        my_set_cookie('name', $one['name']);
        my_set_cookie('email',  $one['email']);
        my_set_cookie('PHPSESSID',session_id());
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */