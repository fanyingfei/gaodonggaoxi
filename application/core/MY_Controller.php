<?php

class MY_controller extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if(!isset($_SESSION)) session_start();
        $ip = get_real_ip();
        if(!in_array($ip, array( '127.0.0.1','101.245.183.255','116.228.159.142'))){
            $this->check_access();
            $this->save_access();
        }
        $is_login = is_login() ? 1 : 0;
        $name = empty($_COOKIE['name']) ? '' : $_COOKIE['name'] ; //没登陆也有，用COOLIE
        $email = empty($_COOKIE['email']) ? '' : $_COOKIE['email'] ; //没登陆也有，用COOLIE
        $search = empty($_COOKIE['search']) ? '' : $_COOKIE['search'] ; //没登陆也有，用COOLIE
        $avatar = empty($_SESSION['avatar']) ? '' : $_SESSION['avatar'] ; //登陆才有，用SESSION
        $is_admin = empty($_SESSION['is_admin']) ? 0 : $_SESSION['is_admin']; //登陆才有，用SESSION
        $url_qq = 'https://graph.qq.com/oauth/show?which=ConfirmPage&display=pc&display=pc&response_type=code&client_id='.APP_ID.'&redirect_uri='.REDIRECT_URL_QQ ;
        $url_wb = 'https://api.weibo.com/oauth2/authorize?client_id='.SINA_ID.'&response_type=code&redirect_uri='.REDIRECT_URL_WB ;

        $this->assign('url_qq',$url_qq);
        $this->assign('url_wb',$url_wb);
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
        $this->ci_smarty->display('main/'.$header);
        $this->ci_smarty->display('main/'.$html);
        if(!empty($right)) $this->ci_smarty->display('main/'.$right);
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
        $this->assign('msg',empty($msg) ? '出错啦' : $msg);
        $this->ci_smarty->display('error.html');
        exit;
    }

    public function get_user_avatar($list , $col = ''){
        if(empty($list)) return array();

        $user_column = array_unique(array_column($list , 'user_id'));
        foreach($user_column as $key=>$v){
            if(empty($v)) unset($user_column[$key]);
        }
        if(empty($user_column)) return array();

        $this->load->model('Model_users');
        $where = 'where user_id in ('.implode(',',$user_column).')';
        $user_res = $this->model_users->GetAll($where);
        if(empty($user_res))  return array();

        if($col == '') return $user_res;
        return array_column($user_res,$col,'user_id');
    }

    public function record($table_name){
        $id = intval($_REQUEST['id']);
        $click = $_REQUEST['click'];
        if(!in_array($click,array('good','bad'))) splash('error','Try again');
        if(empty($id) || empty($click)) splash('error','Try again');
        $this->load->model('Model_record');
        $type = intval($_REQUEST['type']);
        $ip = get_real_ip();

        if(empty($_SESSION['is_admin'])){
            $where = "where row_id = $id and type = $type and ip = '$ip'";
            $res = $this->model_record->GetRow($where);
            if(!empty($res)) splash('error','You are voted');
            $data = array('type'=>$type ,'row_id'=>$id , 'ip'=>$ip,'ip_address'=>'','create_time'=>date('Y-m-d H:i:s'));
            $this->model_record->Save($data);
        }

        $model_name = 'Model_'.$table_name;
        $res  = $this->$model_name->UpdateNum($id, $click);
        if($res){
            splash('success','Think you');
        }else{
            splash('error','Try again');
        }
    }

    public function save_access(){
        $ip = get_real_ip();
        if(isCrawler()) return false;
        if(!empty($_SESSION['is_admin'])) return false;
        $url = $_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];
        $url = str_replace('/index.php?s=/','',$url);
        $url = str_replace('/index.php?','',$url);
        if(strpos($url,'reply') !== false) return false;
        if(empty($url) || $url == '?') $url = 'shou';
        $this->load->model('Model_access');
        $data = array('url'=>$url,'ip'=>$ip,'create_time'=>date('Y-m-d H:i:s'));
        $this->model_access->save($data);
    }


    public function get_nav_list(){
        $nav_res = @file_get_contents(NAV_FILE);
        $nav_data = json_decode($nav_res,true);
        if(!empty($nav_data['view'])){
            $this->assign('navigation',$nav_data['view']);
            return $nav_data;
        }

        $this->load->model('Model_nav');
        $res = $this->model_nav->GetAll( '' , 'sort desc');
        $type = $alias = $view = array();
        foreach($res as $v){
            if(empty($v['is_detail'])){
                $v['table_name'] = 'content';
            }else{
                $v['table_name'] = 'article';
            }
            $type[$v['type']] = $v;
            $alias[$v['alias']] = $v;
            if(!empty($v['is_view'])) $view[$v['type']] = $v;
        }
        $data = array('type'=>$type,'alias'=>$alias,'view'=>$view);
        @file_put_contents(NAV_FILE , json_encode($data));
        $this->assign('navigation',$view);
        return $data;
    }

    public function get_nav_info($type){
        $this->load->model('Model_nav');
        $where = "where type = $type";
        $res = $this->model_nav->GetRow($where);
        $res['table_name'] = empty($res['is_detail']) ? 'Model_content' : 'Model_article';
        return $res;
    }

    public function is_black(){
        $this->load->model('Model_black');
        $ip = get_real_ip();
        $where = "where ip = '$ip";
        $res = $this->model_black->GetRow();
        if(!empty($res)) splash('error','你已被拉入黑名单');
    }

    public function check_access(){
        $url = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        if(strpos($url , 'admin') !== false) return false;

        $ip = get_real_ip();
        $black_str = @file_get_contents(ROOT_PATH. '/tools/black.php');
        if(strpos($black_str,$ip.',') !== false) splash('error','The IP is prohibited to access !');

        if(!empty($_SESSION['access_time'])){
            if(time() - $_SESSION['access_time'] < ACCESS_TIME_LIMIT){
                $_SESSION['access_count']++;
                if($_SESSION['access_count'] > ACCESS_COUNT_LIMIT){
                    $_SESSION['access_time'] = time();
                    splash('error','Access too frequently, please visit later !');
                }
            }else{
                $_SESSION['access_time'] = time();
                $_SESSION['access_count'] = 0;
            }
        }else{
            $_SESSION['access_time'] = time();
            $_SESSION['access_count'] = 0;
        }
    }

}