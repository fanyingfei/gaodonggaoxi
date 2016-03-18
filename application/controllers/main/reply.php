<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class reply extends MY_Controller  {
    const table_name = 'reply';
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
        $res = $this->model_reply->data_list($con_id,$type);
        $user_avatar = parent::get_user_avatar($res , 'avatar');

        $parent_res = my_array_column($res,'content','rep_id');

        foreach($res as &$v){
            $v['reply_content'] = '';
            $v['create_time'] = change_time($v['create_time']);
            $v['avatar'] = empty($user_avatar[$v['user_id']]) ? '/resources/images/avatar_error.jpg' : $user_avatar[$v['user_id']];
            $v['content'] = filter_content_br( strip_tags($v['content'] , '<img><br>' ));
            if($v['parent_id'] > 0 && !empty($parent_res[$v['parent_id']])){
                //回复时只显示一行太短了所以过滤过<br>标签，只留图片和文字
                $v['reply_content'] =strip_tags($parent_res[$v['parent_id']] , '<img>');
            }
        }
        $data['list'] = empty($res) ? '' : $res;
        $data['con_id'] = $con_id;
        $data['is_login'] = 0;
        if(is_login()){
            $data['is_login'] = 1;
            $data['user_id'] = $_SESSION['user_id'];
            $data['name'] = $_SESSION['name'];
            $data['avatar'] = empty($_SESSION['avatar']) ? '/resources/images/avatar_error.jpg' : $_SESSION['avatar'];
        }
        splash('success' , '' , $data);
    }

    public function reply_save(){
        if(!is_login()) splash('error','回复请先登陆');
        //是否拉入黑名单
        $this->load->model('model_black');
        $res = $this->model_black->find_one();
        if($res) splash('error','你已被拉入黑名单');

        $id = intval($_REQUEST['id']);
        if(empty($id)) splash('error','提交失败，请刷新重试');
        $parent_id = intval($_REQUEST['parent_id']);
        if($_SESSION['user_id'] == $parent_id) splash('error','不能自己回复自己');
        $parent_name = strip_tags(trim($_REQUEST['parent_name']));
        $content = trim($_REQUEST['content']);
        $data = $this->content_is_at($parent_id,$parent_name,$content);

        $data['con_id'] = $id;
        $data['type'] = intval($_REQUEST['type']);
        $res  = $this->model_reply->save($data);
        if($res){
            if(in_array($data['type'], parent::$detail_data)){
                $this->load->model('model_article');
                $this->model_article->update_reply($id);
            }else{
                $this->load->model('model_content');
                $this->model_content->update_reply($id);
            }
            splash('success','提交成功');
        }else{
            splash('error','提交失败');
        }
    }

    /*
     * 评论点赞
     */
    public function reply_record(){
        parent :: record(self::table_name);
    }

    /*
     * 回复是否@别人
     */
    public function content_is_at($parent_id,$parent_name,$content){
        $content = str_replace('&nbsp;','',$content);
        $data = array('parent_id'=>$parent_id,'parent_name'=>$parent_name);
        $content = filter_content_br(strip_tags($content,'<img><br>'));
        $data['content'] = $content;
        if(empty($content)) splash('error','请填写评论');
        if(empty($parent_id)) return $data;
        $str = '@'.$parent_name;
        if(strpos( substr( $content , 0 , strlen($str) ) , $str ) !== false){
            $data['content'] = filter_content_br(trim(str_replace($str,'',$content)));
            return $data;
        }elseif(strpos(substr($content,0,1),'@') !== false){
            splash('error','请点击 @Ta 来回复评论');
        }else{
            $data['parent_id'] = 0;
            $data['parent_name'] = '';
            return $data;
        }
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */