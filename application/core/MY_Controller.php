<?php

class MY_controller extends CI_Controller {
    public function __construct() {

        parent::__construct();
    }
    public function assign($key,$val)
    {
        $name = empty($_COOKIE['name']) ? '' : $_COOKIE['name'] ;
        $email = empty($_COOKIE['email']) ? '' : $_COOKIE['email'] ;
        $search = empty($_COOKIE['search']) ? '' : $_COOKIE['search'] ;
        $this->ci_smarty->assign('name',$name);
        $this->ci_smarty->assign('email',$email);
        $this->ci_smarty->assign('search',$search);
        $this->ci_smarty->assign($key,$val);
    }

    public function display($html,$header='header.html',$footer='footer.html',$right= 'right.html')
    {
        if(empty($header)) $header = 'header.html';
        if(empty($footer))   $footer = 'footer.html';
        if(empty($right))     $right = 'right.html';
        $this->ci_smarty->display($header);
        $this->ci_smarty->display($html);
        $this->ci_smarty->display($right);
        $this->ci_smarty->display($footer);
    }

    public function admin_display($html)
    {
        $this->ci_smarty->display('admin/header.html');
        $this->ci_smarty->display($html);
        $this->ci_smarty->display('admin/footer.html');
    }

    /*
    * 记录
    */
    public function record( $table_name = 'model_content'){
        $id = intval($_REQUEST['id']);
        $click = $_REQUEST['click'];
        if(!in_array($click,array('good','bad'))) splash('error','Try again');
        $type = intval($_REQUEST['type']);
        if(empty($id) || empty($click)) splash('error','Try again');
        $this->load->model('model_record');
        $res = $this->model_record->is_has($id,$type);
        if(!$res){
            splash('error','You are voted');
        }
        $data = array('ip'=>get_real_ip(),'type'=>$type,'row_id'=>$id);
        $list  = $this->model_record->save($data);
        $res  = $this->$table_name->update($click,$id);
        if($res){
            splash('success','Think you');
        }else{
            splash('error','Try again');
        }
    }

    public function error_msg($msg){
        $this->assign('msg',$msg);
        $this->ci_smarty->display('index.html');
    }
}