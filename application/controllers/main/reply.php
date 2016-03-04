<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class reply extends MY_Controller  {
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
        $this->load->model('model_reply');
    }

    public function reply_list(){
        $con_id = intval($_REQUEST['id']);
        if(empty($con_id)) splash('error','打开失败，请刷新重试');
        $this->load->model('model_reply');
        $res = $this->model_reply->data_list($con_id);
        $user_avatar = parent::get_user_avatar($res);
        foreach($res as &$v){
            $v['create_time'] = change_time($v['create_time']);
            $v['avatar'] = empty($user_avatar[$v['user_id']]) ? '/resources/images/avatar_error.jpg' : $user_avatar[$v['user_id']];
        }
        $data['list'] = empty($res) ? '' : $res;
        if(is_login()){
            $data['is_login'] = 1;
            $data['name'] = $_SESSION['name'];
            $data['avatar'] = empty($_SESSION['avatar']) ? '/resources/images/avatar_error.jpg' : $_SESSION['avatar'];
        }else{
            $data['is_login'] = 0;
        }
        splash('success' , '' , $data);
    }

    public function reply_save(){
        if(!is_login()) splash('error','回复请先登陆');
        //是否拉入黑名单
        $this->load->model('model_black');
        $this->load->model('model_users');
        $res = $this->model_black->find_one();
        if($res) splash('error','你已被拉入黑名单');
    }

    /*
     * 评论点赞
     */
    public function reply_record(){
        $id = intval($_REQUEST['id']);
        $click = $_REQUEST['click'];
        if(!in_array($click,array('good','bad'))) splash('error','Try again');
        if(empty($id) || empty($click)) splash('error','Try again');
        $this->load->model('model_record');
        $this->load->model('model_reply');
        $res = $this->model_record->is_has($id,-1);
        if(!$res){
            splash('error','You are voted');
        }
        $data = array('type'=>-1,'row_id'=>$id);
        $list  = $this->model_record->save($data);
        $res  = $this->model_reply->update($click,$id);
        if($res){
            splash('success','Think you');
        }else{
            splash('error','Try again');
        }
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */