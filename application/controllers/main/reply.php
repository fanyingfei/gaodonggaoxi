<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Reply extends MY_Controller  {
    private $table_name = 'reply';
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
        $type = intval($_REQUEST['type']);
        if(empty($con_id)) splash('error','打开失败，请刷新重试');
        $this->load->model('model_reply');
        $where = "where con_id = $con_id and type = $type";
        $res = $this->model_reply->GetAll($where , 'rep_id asc');
        $user_avatar = $this->get_user_avatar($res , 'avatar');

        foreach($res as &$v){
            $v['create_time'] = change_time($v['create_time']);
            $parent_res[$v['rep_id']] = $v;
        }

        foreach($res as &$v){
            $v['reply_content'] = '';
            $v['avatar'] = empty($user_avatar[$v['user_id']]) ? '/resources/images/jpg/avatar_error.jpg' : $user_avatar[$v['user_id']];
            if($v['parent_id'] > 0 && !empty($parent_res[$v['parent_id']]['content'])){
                $v['reply_content'] = $parent_res[$v['parent_id']];
            }
        }
        $data['list'] = empty($res) ? '' : $res;
        $data['con_id'] = $con_id;
        $data['is_login'] = 0;
        if(is_login()){
            $data['is_login'] = 1;
            $data['user_id'] = $_SESSION['user_id'];
            $data['name'] = $_SESSION['name'];
            $data['avatar'] = empty($_SESSION['avatar']) ? '/resources/images/jpg/avatar_error.jpg' : $_SESSION['avatar'];
        }
        splash('success' , '' , $data);
    }

    public function reply_save(){
        if(!is_login()) splash('error','回复请先登陆');
        //是否拉入黑名单
        $this->is_black();

        $id = intval($_REQUEST['id']);
        if(empty($id)) splash('error','提交失败，请刷新重试');
        $parent_id = intval($_REQUEST['parent_id']);
        if($_SESSION['user_id'] == $parent_id) splash('error','不能自己回复自己');
        $parent_name = strip_tags(trim($_REQUEST['parent_name']));
        $content = trim($_REQUEST['content']);
        $data = $this->content_is_at($parent_id,$parent_name,$content);

        $data['ip'] = get_real_ip();
        $data['con_id'] = $id;
        $data['type'] = intval($_REQUEST['type']);
        $data['create_time'] = date('Y-m-d H:i:s');
        $data['user_id'] = $_SESSION['user_id'];
        $data['name'] = $_SESSION['name'];
        $res  = $this->model_reply->Save($data);
        if($res){
            $nav_info = $this->get_nav_info($data['type']);
            $table_name = $nav_info['table_name'];
            $this->load->model($table_name);
            $this->$table_name->UpdateNum($id,'reply');
            splash('success','提交成功');
        }else{
            splash('error','提交失败');
        }
    }

    /*
     * 评论点赞
     */
    public function reply_record(){
        $_REQUEST['type'] = 0;
        $this->record($this->table_name);
    }

    /*
     * 回复是否@别人
     */
    public function content_is_at($parent_id,$parent_name,$content){
        $content = str_replace('&nbsp;','',$content);
        $data = array('parent_id'=>$parent_id,'parent_name'=>$parent_name);
        $content = strip_tags($content,'<img><br>');
        $data['content'] = $content;
        if(empty($content)) splash('error','请填写评论');
        if(empty($parent_id)) return $data;
        $str = '@'.$parent_name;
        if(strpos( substr( $content , 0 , strlen($str) ) , $str ) !== false){
            $data['content'] = trim(str_replace($str,'',$content));
            return $data;
        }elseif(strpos(substr($content,0,1),'@') !== false){
            splash('error','请点击 @Ta 来回复评论');
        }else{
            $content = str_replace(array('“','”'),'"',rim($content));
            $data['parent_id'] = 0;
            $data['parent_name'] = '';
            return $data;
        }
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */