<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Admin extends MY_Controller  {
    private $status_pass = 1;
    private $status_fail   = 2;
    private $sex_data = array('W'=>'女','M'=>'男','U'=>'未知');
    private $status_data = array(0=>'审核中',1=>'通过',2=>'没通过');
    private $type_name ;
    private $type_detail ;
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
            echo  'you have no permission to do this. ';
            exit;
        }
        $nav_res = $this->get_nav_list();
        $nav_list = $nav_res['type'];
        $type_name = array_column($nav_list,'name','type');
        $type_name[-1] = '浏览';
        $type_name[0]  = '评论';
        $this->type_name = $type_name;
        $this->type_detail = array_column($nav_list,'is_detail','type');
        $this->load->model('model_content');
        $this->load->model('model_article');
        $this->load->model('model_black');
        $this->load->model('model_users');
        $this->load->model('model_reply');
        $this->load->model('model_access');
        $this->load->model('model_record');
        $this->load->model('model_nav');
        $this->load->model('model_permission');
    }

    public function index(){
        $this->native_display('admin/header.html');
        $this->native_display('admin/footer.html');
    }

    public function content()
	{
        $type_list = array();
        foreach($this->type_detail as $key=>$v){
            if(empty($v)) $type_list[$key] = $this->type_name[$key];
        }
        $this->assign('type_list',$type_list);
        $this->assign('status_list',$this->status_data);
        $this->native_display('admin/content.html');
    }

    public function main_list($name , $str=''){
        $where = $order_by = '';
        $table_name = 'model_'.$name;
        $function = $name.'_list';
        $params = deal_str_param($str);
        $p = empty($params['offset']) ? 0 : $params['offset']/10;
        $limit = empty($params['limit']) ? 10 : $params['limit'];
        $sort = empty($params['sort']) ? '' : $params['sort'];
        $sort_by = empty($params['order']) ? '' : $params['order'];

        $where = $this->get_where_param($params);
        if(!empty($sort) && !empty($sort_by)) $order_by = "$sort $sort_by";
        if(empty($order_by) && $name == 'nav') $order_by = 'sort desc';
        //得到数据
        $list = $this->$table_name->GetAll($where , $order_by ,$p,$limit );
        $list = $this->$function($list);

        $total = $this->$table_name->GetTotal($where);

        $result = array(
            'total'=>$total,
            'rows'=>$list,
        );
        echo json_encode($result);
    }

    public function content_list($list){
        foreach($list as &$v){
            $v['op'] = '<button data-id="'.$v['con_id'].'" class="btn edit-btn" data-toggle="modal" data-target="#myModal">编辑</button>';
            $v['con_id'] = $this->get_id_url($v);
            $v['status'] = $this->status_data[$v['status']];
            $v['user_id'] = empty($v['user_id']) ? '否' : '是';
            $v['type'] = $this->type_name[$v['type']];
        }
        return $list;
    }

    public function delete($name){
        $this->check_permission($name.'_delete');
        $table_name = 'model_'.$name;
        $ids = explode(',',$_REQUEST['ids']);
        $res = $this->$table_name->delete($ids);
        if($res){
            splash('success','删除成功');
        }else{
            splash('error','删除失败,请重试');
        }
    }

    public function pass($name){
        $this->check_permission($name.'_pass');
        $table_name = 'model_'.$name;
        $ids = trim($_REQUEST['ids']);
        $where = 'where con_id in ('.$ids.')';
        $res = $this->$table_name->UpdateBySql($where,'status',$this->status_pass);
        if($res){
            splash('success','审核通过');
        }else{
            splash('error','审核失败,请重试');
        }
    }

    public function fail($name){
        $this->check_permission($name.'_fail');
        $table_name = 'model_'.$name;
        $ids = $_REQUEST['ids'];
        $where = 'where con_id in ('.$ids.')';
        $res = $this->$table_name->UpdateBySql($where,'status',$this->status_fail);
        if($res){
            splash('success','成功');
        }else{
            splash('error','失败,请重试');
        }
    }

    public function update_row($name){
        $this->check_permission($name.'_edit');
        $table_name = 'model_'.$name;
        $con_id = intval($_REQUEST['con_id']);
        $data['type'] = intval($_REQUEST['type']);
        $data['status'] = intval($_REQUEST['status']);
        $data['good'] = intval($_REQUEST['good']);
        $data['bad'] = intval($_REQUEST['bad']);
        $data['reply'] = intval($_REQUEST['reply']);
        $data['content'] = trim($_REQUEST['content']);
        if(!empty($_REQUEST['scan'])) $data['scan'] = trim($_REQUEST['scan']);
        if(!empty($_REQUEST['title'])) $data['title'] = trim($_REQUEST['title']);
        $res  = $this->$table_name->UpdateByKey($con_id,$data);
        if($res) splash('success','修改成功');
        splash('error','修改失败,请重试');
    }

    public function article()
    {
        $type_list = array();
        foreach($this->type_detail as $key=>$v){
            if(!empty($v)) $type_list[$key] = $this->type_name[$key];
        }
        $this->assign('type_list',$type_list);
        $this->assign('status_list',$this->status_data);
        $this->native_display('admin/article.html');
    }

    public function article_list($list){
        foreach($list as &$v){
            $v['op'] = '<button data-id="'.$v['con_id'].'" class="btn edit-btn" data-toggle="modal" data-target="#myModal">编辑</button>';
            $v['con_id'] = $this->get_id_url($v);
            $v['status'] = $this->status_data[$v['status']];
            $v['user_id'] = empty($v['user_id']) ? '否' : '是';
            $v['type'] = $this->type_name[$v['type']];
        }
        return $list;
    }

    public function user()
    {
        $this->native_display('admin/user.html');
    }

    public function users_list($list){
        foreach($list as &$v){
            if(empty($v['sex'])) $v['sex'] = 'U';
            $v['sex'] = $this->sex_data[$v['sex']];
            $v['is_validate'] = '否';
            if(!empty($v['is_validate']) && !empty($v['name'])){
                $v['is_validate'] = '是';
            }
            $v['year'] = empty($v['year']) ?  '' : date('Y') - $v['year'];
            $v['avatar'] = empty($v['avatar']) ? '' : "<img src='".$v['avatar']."' />";
            $v['last_login'] = empty($v['last_login']) ? '' : change_time($v['last_login']);
            if(empty($v['is_admin'])){
                $v['is_admin'] = '否';
                $v['op'] = '<span class="priv_no">无</span>';
            }else{
                $v['is_admin'] = '是';
                $v['op'] = '<button data-target="#myModal" data-toggle="modal" class="btn edit-btn" data-id="'.$v['user_id'].'">权限</button>';
            }
        }
        return $list;
    }


    public function user_add_admin(){
        $this->check_permission('user_add_admin');
        $ids = trim($_REQUEST['ids']);
        $where = "where user_id in ($ids)";
        $res = $this->model_users->UpdateBySql($where , 'is_admin', 1);
        if($res){
            splash('success','删除成功');
        }else{
            splash('error','删除失败,请重试');
        }
    }

    public function user_remove_admin(){
        $this->check_permission('user_remove_admin');
        $ids = trim($_REQUEST['ids']);
        $where = "where user_id in ($ids)";
        $res = $this->model_users->UpdateBySql($where , 'is_admin', 0);
        if($res){
            splash('success','移除管理员成功');
        }else{
            splash('error','移除管理员失败,请重试');
        }
    }

    public function user_permission(){
        $user_id = intval($_REQUEST['user_id']);
        if(empty($user_id)) splash('error','参数有误');
        $user_res = $this->model_users->GetRow("where user_id = $user_id",'permission');
        if(empty($user_res)) splash('error','没有记录');
        $permission = explode(',',$user_res['permission']);

        $data = array();
        $per_list = $this->model_permission->GetAll();
        foreach($per_list as $v){
            $v['check'] = 0;
            if(in_array($v['value'],$permission)) $v['check'] = 1;
            $data[$v['cat']][] = $v;
        }
        splash('success','',array('user_id'=>$user_id,'list'=>$data));
    }

    public function user_priv_update(){
        $this->check_permission('user_permission');
        $user_id = intval($_REQUEST['user_id']);
        if(empty($user_id)) splash('error','参数有误');
        $priv_str = trim($_REQUEST['str']);

        $res = $this->model_users->UpdateByKey($user_id,array('permission'=>$priv_str));
        if($res){
            $_SESSION['permission'] = $priv_str;
            splash('error','修改成功');
        }
        else splash('error','修改失败');
    }

    public function black()
    {
        $this->native_display('admin/black.html');
    }

    public function black_list($list){
        return $list;
    }


    public function reply()
    {
        $this->native_display('admin/reply.html');
    }

    public function reply_list($list){
        foreach($list as &$v){
            $v['con_id'] = $this->get_id_url($v);
            $v['type'] = $this->type_name[$v['type']];
        }
        return $list;
    }

    public function reply_delete(){
        $this->check_permission('reply_delete');
        $ids = trim($_REQUEST['ids']);
        $where = 'where rep_id in ('.$ids.')';
        $data = $this->model_reply->GetAll($where);
        if(empty($data))  splash('error','数据为空,请重试');
        $detail_res = $this->type_detail;
        foreach($data as $v){
            if(empty($detail_res[$v['type']])){
                $this->model_content->UpdateNum($v['con_id'] ,'reply',  '-1');
            }else{
                $this->model_article->UpdateNum($v['con_id'] ,'reply', '-1');
            }
        }
        $ids = explode(',',$ids);
        $res = $this->model_reply->Delete($ids);
        if($res){
            splash('success','删除成功');
        }else{
            splash('error','删除失败,请重试');
        }
    }

    public function record()
    {
        $this->assign('type_list',$this->type_name);
        $this->native_display('admin/record.html');
    }

    public function record_list($list){
        foreach($list as &$v){
            if(empty($v['ip_address'])){
                $v['ip_address'] = get_ip_local($v['ip']);
                if(!empty($v['ip_address'])) $this->model_record->UpdateByKey($v['rec_id'] , array('ip_address'=>$v['ip_address']));
            }
            $v['type'] = $this->type_name[$v['type']];
        }
        return $list;
    }


    public function access()
    {
        $this->native_display('admin/access.html');
    }

    public function access_list($list){
        foreach($list as &$v){
            if(empty($v['ip_address'])){
                $v['ip_address'] = get_ip_local($v['ip']);
                if(!empty($v['ip_address'])) $this->model_access->UpdateByKey($v['rec_id'] , array('ip_address'=>$v['ip_address']));
            }
        }
        return $list;
    }


    public function nav()
    {
        $this->native_display('admin/nav.html');
    }

    public function nav_list($list){
        foreach($list as &$v){
            $v['is_view'] = empty($v['is_view']) ? '否' : '是';
            $v['is_detail'] = empty($v['is_detail']) ? '无' : '有';
            $v['op'] = '<button data-id="'.$v['nav_id'].'" class="btn edit-btn" data-toggle="modal" data-target="#myModal">编辑</button>';
        }
        return $list;
    }

    public function get_row($name){
        if(empty($name)) splash('error','参数有误');
        $table_name = 'model_'.$name;
        $id = intval($_REQUEST['id']);
        if(empty($id)) splash('error','参数有误');
        $res  = $this->$table_name->GetRowByKey($id);
        if(empty($res)) splash('error','没有数据');
        splash('success','',$res);
    }

    public function nav_update(){
        $this->check_permission('nav_edit');
        $nav_id = intval($_REQUEST['nav_id']);
        if(empty($nav_id)) splash('error','参数有误');
        $data['sort'] = empty($_REQUEST['sort']) ? 0 : intval($_REQUEST['sort']);
        $data['desc'] = empty($_REQUEST['desc']) ? '' : trim($_REQUEST['desc']);
        $data['tags'] = empty($_REQUEST['tags']) ? '' : trim($_REQUEST['tags']);
        $data['is_view'] = empty($_REQUEST['is_view']) ? 0 : trim($_REQUEST['is_view']);
        $data['keywords'] = empty($_REQUEST['keywords']) ? '' : trim($_REQUEST['keywords']);
        $data['description'] = empty($_REQUEST['description']) ? '' : trim($_REQUEST['description']);
        $res  = $this->model_nav->UpdateByKey($nav_id,$data);
        @file_put_contents(NAV_FILE , '');
        if($res) splash('success','修改成功');
        splash('error','修改失败,请重试');
    }

    public function black_text(){
        $black_str = file_get_contents(ROOT_PATH.'tools/black.php');
        splash('success','',$black_str);
    }

    public function black_update(){
        $this->check_permission('black_edit');
        $str = trim($_REQUEST['content']);
        if(empty($str)) $str = 'localhost,';
        $res = file_put_contents(ROOT_PATH.'tools/black.php',$str);
        if(empty($res)){
            splash('error','保存失败');
        }else{
            splash('success','保存成功');
        }
    }

    public function get_where_param($params){
        if(empty($params)) return '';
        $column = array('con_id','status','type','ip');
        $str = '';
        foreach($params as $key=>$v){
            if(!in_array($key , $column)) continue;
            if($key == 'status' && $v < 0) continue;
            if($key == 'type' && $v < -10) continue;
            $str .= ' and '.$key.' = "'.$v.'"';
        }
        if(!empty($str)) return ' where 1 '.$str;
    }

    public function get_id_url($v){
        $detail_res = $this->type_detail;
        if(empty($detail_res[$v['type']])){
            $url = get_single_url($v['con_id'],$v['create_time']);
        }else{
            $url = get_detail_url($v['con_id'],$v['create_time']);
        }
        return '<a target="_blank" href="'.$url.'">'.$v['con_id'].'</a>';
    }

    public function check_permission($priv_str){
        return true;
        if($_SESSION['user_id'] == 1) return true;
        $user_priv = empty($_SESSION['permission']) ? '' : $_SESSION['permission'];
        if (strpos( ','.$user_priv.',' , ','.$priv_str.',') === false) splash('error','没有权限做此操作');
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */