<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class admin extends MY_Controller  {
    private $status_pass = 1;
    private $status_fail   = 2;
    private $sex_data = array('W'=>'女','M'=>'男','U'=>'未知');
    private $status_data = array(0=>'审核中',1=>'通过',2=>'没通过');
    private $type_data = array(1=>'闲话' ,2=>'小知识' ,3=>'美文',4=>'渣渣说',5=>'妹子',6=>'神话');
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
        if(!is_login() || $_SESSION['is_admin'] != 1){
            header("Location: /");
            exit;
        }
        $this->load->model('model_content');
        $this->load->model('model_black');
        $this->load->model('model_users');
    }

    public function index(){
        $this->native_display('admin/header.html');
        $this->native_display('admin/footer.html');
    }

    public function content()
	{
        $this->assign('type_list',$this->type_data);
        $this->assign('status_list',$this->status_data);
        $this->native_display('admin/content.html');
    }

    public function content_list(){
        $p = empty($_REQUEST['offset']) ? 0 : $_REQUEST['offset']/10;
        $limit = empty($_REQUEST['limit']) ? 10 : $_REQUEST['limit'];
        $sort = empty($_REQUEST['sort']) ? '' : $_REQUEST['sort'];
        $sort_by = empty($_REQUEST['order']) ? '' : $_REQUEST['order'];
        $where = $order_by = '';

        if(!empty($sort) && !empty($sort_by)){
            $order_by = " order by $sort $sort_by ";
        }
        //得到数据
        $list  = $this->model_content->data_list($p+1,$limit , $where , $order_by);
        foreach($list as &$v){
            $v['status'] = $this->status_data[$v['status']];
            $v['user_id'] = empty($v['user_id']) ? '否' : '是';
            $v['content'] = strip_tags($v['content'],'<br><img>');
            $v['create_time'] = change_time($v['create_time']);
            $v['type'] = $this->type_data[$v['type']];
        }

        $total = $this->model_content->data_count($where);

        $result = array(
            'total'=>$total,
            'rows'=>$list,
        );
        echo json_encode($result);
    }

    public function content_delete(){
        $ids = explode(',',$_REQUEST['ids']);
        $res = $this->model_content->delete($ids);
        if($res){
            splash('success','删除成功');
        }else{
            splash('error','删除失败,请重试');
        }
    }

    public function content_pass(){
        $ids = trim($_REQUEST['ids']);
        $res = $this->model_content->update_status($ids,$this->status_pass);
        if($res){
            splash('success','审核通过');
        }else{
            splash('error','审核失败,请重试');
        }
    }

    public function content_fail(){
        $ids = $_REQUEST['ids'];
        $res = $this->model_content->update_status($ids,$this->status_fail);
        if($res){
            splash('success','成功');
        }else{
            splash('error','失败,请重试');
        }
    }

    public function user()
    {
        $this->native_display('admin/user.html');
    }

    public function user_list(){
        $p = empty($_REQUEST['offset']) ? 0 : $_REQUEST['offset']/10;
        $limit = empty($_REQUEST['limit']) ? 10 : $_REQUEST['limit'];
        $sort = empty($_REQUEST['sort']) ? '' : $_REQUEST['sort'];
        $sort_by = empty($_REQUEST['order']) ? '' : $_REQUEST['order'];
        $where = $order_by = '';

        if(!empty($sort) && !empty($sort_by)){
            $order_by = " order by $sort $sort_by ";
        }
        //得到数据
        $list  = $this->model_users->data_list($p+1,$limit , $where , $order_by);
        foreach($list as &$v){
            $v['is_admin'] = empty($v['is_admin']) ? '否' : '是';
            $v['sex'] = $this->sex_data[$v['sex']];
            $v['is_validate'] = '否';
            if(!empty($v['is_validate']) && !empty($v['name'])){
                $v['is_validate'] = '是';
            }
            $v['avatar'] = empty($v['avatar']) ? '' : "<img src='".$v['avatar']."' />";
            $v['last_login'] = empty($v['last_login']) ? '' : change_time($v['last_login']);
        }

        $total = $this->model_users->data_count($where);

        $result = array(
            'total'=>$total,
            'rows'=>$list,
        );
        echo json_encode($result);
    }

    public function user_delete(){
        $ids = explode(',',$_REQUEST['ids']);
        $res = $this->model_users->delete($ids);
        if($res){
            if(!empty($_SESSION['user_id'])) $_SESSION['user_id'] = '';
            splash('success','删除成功');
        }else{
            splash('error','删除失败,请重试');
        }
    }

    public function user_add_admin(){
        $ids = trim($_REQUEST['ids']);
        $res = $this->model_users->update_admin($ids , 1);
        if($res){
            splash('success','删除成功');
        }else{
            splash('error','删除失败,请重试');
        }
    }

    public function user_remove_admin(){
        $ids = trim($_REQUEST['ids']);
        $res = $this->model_users->update_admin($ids , 0);
        if($res){
            splash('success','移除管理员成功');
        }else{
            splash('error','移除管理员失败,请重试');
        }
    }

    public function black()
    {
        $this->native_display('admin/black.html');
    }

    public function black_list(){
        $p = empty($_REQUEST['offset']) ? 0 : $_REQUEST['offset']/10;
        $limit = empty($_REQUEST['limit']) ? 10 : $_REQUEST['limit'];
        $sort = empty($_REQUEST['sort']) ? '' : $_REQUEST['sort'];
        $sort_by = empty($_REQUEST['order']) ? '' : $_REQUEST['order'];
        $where = $order_by = '';

        if(!empty($sort) && !empty($sort_by)){
            $order_by = " order by $sort $sort_by ";
        }
        //得到数据
        $list  = $this->model_black->data_list($p+1,$limit , $where , $order_by);

        $total = $this->model_black->data_count($where);

        $result = array(
            'total'=>$total,
            'rows'=>$list,
        );
        echo json_encode($result);
    }

    public function black_delete(){
        $ids = explode(',',$_REQUEST['ids']);
        $res = $this->model_black->delete($ids);
        if($res){
            splash('success','删除成功');
        }else{
            splash('error','删除失败,请重试');
        }
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */