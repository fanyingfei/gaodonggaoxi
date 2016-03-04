<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class user extends MY_Controller  {

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
        $this->load->model('model_users');
        $this->assign('keywords','闲话');
        $this->assign('description','闲话');
    }

    public function user_info(){
        if(!is_login()){
            header_index('login');
        }
        $user = $this->model_users->get_user_by_user_id($_SESSION['user_id']);
        if(empty($user)) parent::error_msg();
        $user['avatar'] = empty($user['avatar']) ? '' : $user['avatar'];

        $sex = array('M'=>'男','W'=>'女','U'=>'未知');
        $age = array('');
        for($i = 10 ; $i < 90 ; $i++){
            array_push($age,$i);
        }
        $this->assign('user',$user);
        $this->assign('sex',$sex);
        $this->assign('age',$age);
        $this->assign('select',1);
        $this->assign('title','用户中心-个人资料');
        $this->assign('body','person_center');
        $this->user_display('user/user_info.html');
    }

    public function user_avatar(){
        if(!is_login()){
            header_index('login');
        }

        $avatar = empty($_SESSION['avatar']) ? '' : $_SESSION['avatar'];

        $this->assign('select',2);
        $this->assign('avatar',$avatar);
        $this->assign('title','用户中心-修改头像');
        $this->assign('body','person_center');
        $this->user_display('user/user_avatar.html');
    }

    public function user_news(){
        if(!is_login()){
            header_index('login');
        }
        $user = $this->model_users->get_user_by_user_id($_SESSION['user_id']);
        if(empty($user)) parent::error_msg();

        $this->assign('select',3);
        $this->assign('title','用户中心-我的消息');
        $this->assign('body','person_center');
        $this->user_display('user/user_news.html');
    }

    public function login_index($param=''){
        if(is_login()){
            header_index();
        }
        $this->assign('title','登录');
        $this->native_display('user/login.html');
    }

    /*
     * 登陆
     */
    public function login_in(){
        if(is_login()) splash('success','');
        $email = trim(strip_tags($_REQUEST['email']));
        $password = trim(strip_tags($_REQUEST['password']));
        $one = $this->model_users->get_user_by_email($email);
        if(empty($one)) splash('error','账号不存在');
        if($one['password'] != md5($password.ENCRYPTION)) splash('error','密码不正确');
        if(empty($one['is_validate']) || empty($one['name'])){
            splash('error','请先激活账号');
        }
        $this->model_users->update_login_time($one['user_id']);
        $_SESSION['user_id'] = $one['user_id'];
        $_SESSION['email'] = $one['email'];
        $_SESSION['name'] = $one['name'];
        $_SESSION['is_admin'] = empty($one['is_admin']) ? 0 : $one['is_admin'];
        if(!empty( $one['avatar'])) $_SESSION['avatar'] = $one['avatar'];

        my_set_cookie('is_login',1);
        my_set_cookie('name', $one['name']);
        my_set_cookie('email',  $one['email']);
        my_set_cookie('PHPSESSID',session_id());

        splash('success','');
    }

    public function login_out(){
        $_SESSION['user_id'] = '';
        $_SESSION['name']    = '';
        $_SESSION['email']    = '';
        expire_cookie('is_login');
        expire_cookie('name');
        expire_cookie('email');
        header_index();
    }

    public function register($param=''){
        $this->assign('title','注册');
        $this->native_display('user/register.html');
    }

    public function register_save(){
        //是否拉入黑名单
        $this->load->model('model_black');
        $res = $this->model_black->find_one();
        if($res) splash('error','你已被拉入黑名单');

        $data['email'] = trim(strip_tags($_REQUEST['email']));
        $data['code'] = $code = trim(strip_tags($_REQUEST['code']));
        $data['password'] = trim(strip_tags($_REQUEST['password']));
        $data['confirm'] = trim(strip_tags($_REQUEST['confirm']));

        register_valid($data);

        unset($data['confirm']);
        unset($data['code']);
        $res_by_email = $this->model_users->get_user_by_email($data['email']);
        if(!empty($res_by_email)) splash('error','该邮箱已被注册，不可使用');

        $data['password'] = md5($data['password'].ENCRYPTION);
        $data['user_id'] = $this->model_users->save($data);
        if($data['user_id']){
            $email_content = get_email_content($data['user_id'],$data['email']);
            $res = my_send_email($data['email'],'账号激活',$email_content);
            if($res){
                splash('success','注册成功，收到邮件后请激活账号');
            }else{
                splash('success','注册成功，邮件发送失败，请联系邮箱 '.EMAIL_NUMBER);
            }
        }else{
            splash('error','注册失败,请重试');
        }
    }

    /*
     * 激活账号，填昵称页面
     */
    public function user_validate(){
        $param = json_decode(base64_decode($_REQUEST['param']),true);

        $time = $param['time'];
        if(time() - $time > 24*3600){
            parent::error_msg('链接已失效，请联系'.EMAIL_NUMBER .'重新发送');
        }
        $user_id = intval($param['user_id']);
        if(empty($user_id)) parent::error_msg();

        $user_info = $this->model_users->get_user_by_user_id($user_id);
        if(empty($user_info) || $user_info['email'] != $param['email']){
            parent::error_msg();
        }
        if(!empty($user_info['is_validate']) && !empty($user_info['name'])){
            header_index('login');
        }
        $this->assign('title','昵称');
        $this->assign('unique_id',$user_id);
        $this->native_display('user/nick_name.html');
    }

    public function nick_save(){
        $id = intval($_REQUEST['id']);
        $name = trim(strip_tags($_REQUEST['name']));

        if(empty($id) || empty($name)) parent::error_msg();

        $user_info = $this->model_users->get_user_by_user_id($id);
        if(empty($user_info)) parent::error_msg();

        if(!empty($user_info['name']) && !empty($user_info['is_validate'])){
            splash('error','该账号已激活');
        }

        $res_by_name = $this->model_users->get_user_by_name($name);
        if(!empty($res_by_name) && $res_by_name['user_id'] != $id) splash('error','该昵称已被注册，不可使用');
        $res = $this->model_users->user_validate($id,$name);
        if($res){
            splash('sucess','激活成功，立即登录',array('op'=>1));
        }else{
            splash('error','激活失败,请重试');
        }
    }

    public function info_save(){
        //没有登陆直接跳登陆页
        if(!is_login()) header_index('login');
        $user_id = $_SESSION['user_id'];
        if(empty($user_id)) parent::error_msg();
        $data['mobile'] = trim(strip_tags($_REQUEST['mobile']));
        $data['weixin'] = trim(strip_tags($_REQUEST['weixin']));
        $data['sina'] = trim(strip_tags($_REQUEST['sina']));
        $data['age'] = trim(strip_tags($_REQUEST['age']));
        $data['sex'] = trim(strip_tags($_REQUEST['sex']));
        $data['qq'] = trim(strip_tags($_REQUEST['qq']));
        if(!empty($data['mobile'])) valid_mobile($data['mobile']);
        $res = $this->model_users->update_user_info($user_id,$data);
        if($res){
            splash('sucess','保存成功');
        }else{
            splash('error','保存失败,请重试');
        }
    }

    public function avatar_save(){
        if(!is_login()) header_index('login');
        $user_id = $_SESSION['user_id'];
        $data['avatar'] = trim(strip_tags($_REQUEST['avatar']));
        if(empty($data['avatar'])) splash('error','请输入图片url');
        $res = $this->model_users->update_user_info($user_id,$data);
        if($res){
            $_SESSION['avatar'] = $data['avatar'];
            splash('sucess','保存成功');
        }else{
            splash('error','保存失败,请重试');
        }
    }

    public function user_send_email(){

    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */