<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class login extends MY_Controller  {

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

    public function login_index($param=''){
        $this->assign('title','登录');
        $this->login_display('login/login.html');
    }

    public function login_in(){
        if(is_login()) splash('success','');
        $email = trim(strip_tags($_REQUEST['email']));
        $password = trim(strip_tags($_REQUEST['password']));
        $one = $this->model_users->get_user_by_email($email);
        if(empty($one)) splash('error','邮箱不存在');
        if($one['password'] != md5($password.ENCRYPTION)) splash('error','密码不正确');
        $_SESSION['user_id'] = $one['user_id'];
        $_SESSION['name']    = $one['name'];
        $_SESSION['email']    = $one['email'];
        my_set_cookie('is_login',1);
        my_set_cookie('name', $one['name']);
        my_set_cookie('email',  $one['email']);
        splash('success','');
    }

    public function login_out(){
        $_SESSION['user_id'] = '';
        $_SESSION['name']    = '';
        $_SESSION['email']    = '';
        expire_cookie('is_login');
        header("Location: ".$_SERVER['HTTP_REFERER']);
    }

    public function register($param=''){
        $this->assign('title','注册');
        $this->login_display('login/register.html');
    }

    public function register_save(){
        //是否拉入黑名单
        $this->load->model('model_black');
        $res = $this->model_black->find_one();
        if($res) splash('error','你已被拉入黑名单，以后请谨慎发言');

        $data['email'] = trim(strip_tags($_REQUEST['email']));
        $data['name'] = trim(strip_tags($_REQUEST['name']));
        $data['password'] = trim(strip_tags($_REQUEST['password']));
        $data['confirm'] = trim(strip_tags($_REQUEST['confirm']));

        register_valid($data);

        unset($data['confirm']);
        $one = $this->model_users->get_user_by_email($data['email']);
        if(!empty($one)) splash('error','该邮箱已被注册，不可使用');

        $data['password'] = md5($data['password'].ENCRYPTION);
        $res = $this->model_users->save($data);
        if($res){
            splash('success','注册成功');
        }else{
            splash('error','注册失败,请重试');
        }
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */