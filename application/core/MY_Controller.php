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
    public function record($type , $table_name = 'model_content'){
        $id = $_REQUEST['id'];
        $click = $_REQUEST['click'];
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

    /*
     * 文字保存
     */
    public function content_save($type){
        $data['name'] = trim($_REQUEST['name']);
        $data['email'] = trim($_REQUEST['email']);
        $data['content'] = str_replace('/\n/g','<br/>',trim($_REQUEST['content']));
        valid($data['name'],$data['email'],$data['content']);
        $this->load->model('model_black');
        $res = $this->model_black->find_one();
        if($res) splash('error','你已被拉入黑名单，以后请谨慎发言');

        $data['type'] = $type;
        $res  = $this->model_content->save($data);
        if($res){
            splash('success','提交成功');
        }else{
            splash('error','提交失败');
        }
    }
}