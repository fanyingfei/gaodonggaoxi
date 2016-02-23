<?php

class MY_controller extends CI_Controller {
    public function __construct() {

        parent::__construct();
    }
    public function assign($key,$val)
    {
        $name = empty($_COOKIE['name']) ? '' : $_COOKIE['name'] ;
        $email = empty($_COOKIE['email']) ? '' : $_COOKIE['email'] ;
        $this->ci_smarty->assign('name',$name);
        $this->ci_smarty->assign('email',$email);
        $this->ci_smarty->assign($key,$val);
    }

    public function display($html)
    {
        $this->ci_smarty->display('header.html');
        $this->ci_smarty->display($html);
        $this->ci_smarty->display('footer.html');
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
    public function record($id,$type){
        $this->load->model('model_record');
        $res = $this->model_record->is_has($id,$type);
        if(!$res){
            splash('error','You are vote');
        }
        $data = array('ip'=>get_real_ip(),'type'=>$type,'row_id'=>$id);
        $list  = $this->model_record->save($data);
    }
}