<?php

class MY_controller extends CI_Controller {
    static $detail_data = array(4 , 6 , 7); //需要展示详情的
    static $all_type_data   = array('xiao'=>1 ,'hua'=>2 ,'zzs'=>4,'meizi'=>5,'tale'=>6 , 'cxy'=>7);
    static $all_type_name = array('-1'=>'浏览',0=>'评论',1=>'搞笑',2=>'那些话',4=>'渣渣说',5=>'妹子',6=>'故事' , 7=>'程序猿');
    static $order_data = array('最新'=>'create_time desc','最早'=>'create_time asc','最赞'=>'good desc , bad asc','最冷'=>'bad desc , good asc','随机'=>'random');

    public function __construct() {
        if(!isset($_SESSION)) session_start();
        parent::__construct();
        $this->save_access();
    }
    public function assign($key,$val)
    {
        $is_login = is_login() ? 1 : 0;
        $name = empty($_COOKIE['name']) ? '' : $_COOKIE['name'] ; //没登陆也有，用COOLIE
        $email = empty($_COOKIE['email']) ? '' : $_COOKIE['email'] ; //没登陆也有，用COOLIE
        $search = empty($_COOKIE['search']) ? '' : $_COOKIE['search'] ; //没登陆也有，用COOLIE
        $order_by = empty($_COOKIE['order_by']) ? '最新' : $_COOKIE['order_by']; //排序
        $avatar = empty($_SESSION['avatar']) ? '' : $_SESSION['avatar'] ; //登陆才有，用SESSION
        $is_admin = empty($_SESSION['is_admin']) ? 0 : $_SESSION['is_admin']; //登陆才有，用SESSION

        $this->ci_smarty->assign('name',$name);
        $this->ci_smarty->assign('email',$email);
        $this->ci_smarty->assign('avatar',$avatar);
        $this->ci_smarty->assign('search',$search);
        $this->ci_smarty->assign('is_login',$is_login);
        $this->ci_smarty->assign('is_admin',$is_admin);
        $this->ci_smarty->assign('cur_order',$order_by);
        $this->ci_smarty->assign($key,$val);
    }

    public function display($html,$header='header.html',$footer='footer.html',$right= 'right.html')
    {
        if(empty($header)) $header = 'header.html';
        if(empty($footer))   $footer = 'footer.html';
        if(empty($right))     $right = 'right.html';
        $this->ci_smarty->display('main/'.$header);
        $this->ci_smarty->display('main/'.$html);
        $this->ci_smarty->display('main/'.$right);
        $this->ci_smarty->display('main/'.$footer);
    }

    public function native_display($html)
    {
        $this->ci_smarty->display($html);
    }

    public function user_display($html)
    {
        $this->ci_smarty->display('main/header.html');
        $this->ci_smarty->display('user/left.html');
        $this->ci_smarty->display($html);
    }

    public function error_msg($msg = ''){
        $this->assign('body','error');
        $this->assign('title','出错啦');
        $this->assign('msg',empty($msg) ? '出错啦' : $msg);
        $this->assign('keywords','');
        $this->assign('description','');
        $this->ci_smarty->display('main/header.html');
        $this->ci_smarty->display('error.html');
        exit;
    }

    public function get_user_avatar($list , $col = ''){
        if(empty($list)) return array();

        $user_column = array_unique(my_array_column($list , 'user_id'));
        foreach($user_column as $key=>$v){
            if(empty($v)) unset($user_column[$key]);
        }
        if(empty($user_column)) return array();

        $this->load->model('model_users');
        $user_res = $this->model_users->get_user_list($user_column);
        if(empty($user_res))  return array();

        if($col == '') return $user_res;
        return my_array_column($user_res,$col,'user_id');
    }

    public function record($table_name){
        $id = intval($_REQUEST['id']);
        $click = $_REQUEST['click'];
        if(!in_array($click,array('good','bad'))) splash('error','Try again');
        if(empty($id) || empty($click)) splash('error','Try again');
        $this->load->model('model_record');
        $type = intval($_REQUEST['type']);
        $res = $this->model_record->is_has($id, $type);
        if(!$res){
            splash('error','You are voted');
        }
        $data = array('type'=>$type ,'row_id'=>$id);
        $list  = $this->model_record->save($data);

        $model_name = 'model_'.$table_name;
        $res  = $this->$model_name->update($click,$id);
        if($res){
            splash('success','Think you');
        }else{
            splash('error','Try again');
        }
    }

    public function save_access(){
        if(isCrawler()) return false;
        if(!empty($_SESSION['is_admin'])) return false;
        $url = $_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];
        $url = str_replace('/index.php?s=/','',$url);
        $url = str_replace('/index.php?','',$url);
        if(strpos($url,'reply') !== false) return false;
        if(empty($url) || $url == '?') $url = 'xiao';
        $this->load->model('model_access');
        $data = array('url'=>$url);
        $this->model_access->save($data);
    }

}