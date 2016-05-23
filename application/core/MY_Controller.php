<?php

class MY_controller extends CI_Controller {
    static $detail_data = array(4 , 6 , 7); //需要展示详情的
    static $all_type_data   = array('pic'=>1 ,'hua'=>2 ,'duan'=>3,'zzs'=>4,'meizi'=>5,'tale'=>6 , 'cxy'=>7);
    static $all_type_name = array('-1'=>'浏览',0=>'评论',1=>'无聊图',3=>'段子',4=>'渣渣说',5=>'妹子',6=>'故事' , 7=>'程序猿');

    public function __construct() {
        parent::__construct();
        if(!isset($_SESSION)) session_start();
        $this->save_access();
        $is_login = is_login() ? 1 : 0;
        $name = empty($_COOKIE['name']) ? '' : $_COOKIE['name'] ; //没登陆也有，用COOLIE
        $email = empty($_COOKIE['email']) ? '' : $_COOKIE['email'] ; //没登陆也有，用COOLIE
        $search = empty($_COOKIE['search']) ? '' : $_COOKIE['search'] ; //没登陆也有，用COOLIE
        $avatar = empty($_SESSION['avatar']) ? '' : $_SESSION['avatar'] ; //登陆才有，用SESSION
        $is_admin = empty($_SESSION['is_admin']) ? 0 : $_SESSION['is_admin']; //登陆才有，用SESSION

        $this->ci_smarty->assign('nav','');
        $this->ci_smarty->assign('name',$name);
        $this->ci_smarty->assign('email',$email);
        $this->ci_smarty->assign('avatar',$avatar);
        $this->ci_smarty->assign('search',$search);
        $this->ci_smarty->assign('is_login',$is_login);
        $this->ci_smarty->assign('is_admin',$is_admin);
    }
    public function assign($key,$val)
    {
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
        $this->ci_smarty->display('member/left.html');
        $this->ci_smarty->display($html);
        $this->ci_smarty->display('main/footer.html');
    }

    public function error_msg($msg = ''){
        $this->assign('body','error');
        $this->assign('title','出错啦');
        $this->assign('msg',empty($msg) ? '出错啦' : $msg);
        $this->assign('keywords','');
        $this->assign('description','');
        $this->ci_smarty->display('main/header.html');
        $this->ci_smarty->display('error.html');
        $this->ci_smarty->display('main/footer.html');
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
        $where = 'where user_id in ('.implode(',',$user_column).')';
        $user_res = $this->model_users->GetAll($where);
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
        $ip = get_real_ip();

        if(empty($_SESSION['is_admin'])){
            $where = "where row_id = $id and type = $type and ip = '$ip'";
            $res = $this->model_record->GetRow($where);
            if(!empty($res)) splash('error','You are voted');
            $data = array('type'=>$type ,'row_id'=>$id , 'ip'=>$ip,'ip_address'=>'','create_time'=>date('Y-m-d H:i:s'));
            $this->model_record->Save($data);
        }

        $model_name = 'model_'.$table_name;
        $res  = $this->$model_name->UpdateNum($id, $click);
        if($res){
            splash('success','Think you');
        }else{
            splash('error','Try again');
        }
    }

    public function save_access(){
        $ip = get_real_ip();
        if($ip == '127.0.0.1') return false;
        if(isCrawler()) return false;
        if(!empty($_SESSION['is_admin'])) return false;
        $url = $_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];
        $url = str_replace('/index.php?s=/','',$url);
        $url = str_replace('/index.php?','',$url);
        if(strpos($url,'reply') !== false) return false;
        if(empty($url) || $url == '?') $url = 'shou';
        $this->load->model('model_access');
        $data = array('url'=>$url,'ip'=>$ip);
        $this->model_access->save($data);
    }


    public function get_nav(){
        $this->load->model('model_nav');
        $res = $this->model_nav->GetAll( 'where is_view = 1' , 'sort desc');
        $this->ci_smarty->assign('navigation',$res);
        return $res;
    }

}