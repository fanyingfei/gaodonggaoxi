<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class admin extends MY_Controller  {
    private $status_pass = 1;
    private $status_fail   = 2;
    private $sex_data = array('W'=>'女','M'=>'男','U'=>'未知');
    private $status_data = array(0=>'审核中',1=>'通过',2=>'没通过');
    private $type_name ;
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
        $this->type_name = parent::$all_type_name;
        $this->load->model('model_content');
        $this->load->model('model_article');
        $this->load->model('model_black');
        $this->load->model('model_users');
        $this->load->model('model_reply');
        $this->load->model('model_access');
        $this->load->model('model_record');
    }

    public function index(){
        $this->native_display('admin/header.html');
        $this->native_display('admin/footer.html');
    }

    public function content()
	{
        unset($this->type_name[-1]);
        unset($this->type_name[0]);
        $this->assign('type_list',$this->type_name);
        $this->assign('status_list',$this->status_data);
        $this->native_display('admin/content.html');
    }

    public function content_list($str = ''){
        $params = $this->deal_admin_param($str);
        $p = empty($params['offset']) ? 0 : $params['offset']/10;
        $limit = empty($params['limit']) ? 10 : $params['limit'];
        $sort = empty($params['sort']) ? '' : $params['sort'];
        $sort_by = empty($params['order']) ? '' : $params['order'];
        $where = $order_by = '';

        if(!empty($sort) && !empty($sort_by)){
            $order_by = " order by $sort $sort_by ";
        }
        //得到数据
        $list  = $this->model_content->data_list($p,$limit , $where , $order_by);
        foreach($list as &$v){
            $v['status'] = $this->status_data[$v['status']];
            $v['user_id'] = empty($v['user_id']) ? '否' : '是';
            $url = get_single_url($v['con_id'],$v['create_time']);
            $v['content'] = '<a target="_blank" href="'.$url.'">查看详情</a>';
            $v['create_time'] = change_time($v['create_time']);
            $v['type'] = $this->type_name[$v['type']];
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

    public function article()
    {
        unset($this->type_name[-1]);
        unset($this->type_name[0]);
        $this->assign('type_list',$this->type_name);
        $this->assign('status_list',$this->status_data);
        $this->native_display('admin/article.html');
    }

    public function article_list($str = ''){
        $params = $this->deal_admin_param($str);
        $p = empty($params['offset']) ? 0 : $params['offset']/10;
        $limit = empty($params['limit']) ? 10 : $params['limit'];
        $sort = empty($params['sort']) ? '' : $params['sort'];
        $sort_by = empty($params['order']) ? '' : $params['order'];
        $where = $order_by = '';

        if(!empty($sort) && !empty($sort_by)){
            $order_by = " order by $sort $sort_by ";
        }
        //得到数据
        $list  = $this->model_article->data_list($p,$limit , $where , $order_by);
        foreach($list as &$v){
            $v['status'] = $this->status_data[$v['status']];
            $v['user_id'] = empty($v['user_id']) ? '否' : '是';
            $v['create_time'] = change_time($v['create_time']);
            $v['type'] = $this->type_name[$v['type']];
            $url = get_detail_url($v['art_id'],$v['create_time']);
            $v['content'] = '<a target="_blank" href="'.$url.'">查看详情</a>';
        }

        $total = $this->model_article->data_count($where);

        $result = array(
            'total'=>$total,
            'rows'=>$list,
        );
        echo json_encode($result);
    }

    public function article_delete(){
        $ids = explode(',',$_REQUEST['ids']);
        $res = $this->model_article->delete($ids);
        if($res){
            splash('success','删除成功');
        }else{
            splash('error','删除失败,请重试');
        }
    }

    public function article_pass(){
        $ids = trim($_REQUEST['ids']);
        $res = $this->model_article->update_status($ids,$this->status_pass);
        if($res){
            splash('success','审核通过');
        }else{
            splash('error','审核失败,请重试');
        }
    }

    public function article_fail(){
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

    public function user_list($str = ''){
        $params = $this->deal_admin_param($str);
        $p = empty($params['offset']) ? 0 : $params['offset']/10;
        $limit = empty($params['limit']) ? 10 : $params['limit'];
        $sort = empty($params['sort']) ? '' : $params['sort'];
        $sort_by = empty($params['order']) ? '' : $params['order'];
        $where = $order_by = '';

        if(!empty($sort) && !empty($sort_by)){
            $order_by = " order by $sort $sort_by ";
        }
        //得到数据
        $list  = $this->model_users->data_list($p+1,$limit , $where , $order_by);
        foreach($list as &$v){
            $v['is_admin'] = empty($v['is_admin']) ? '否' : '是';
            if(empty($v['sex'])) $v['sex'] = 'U';
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

    public function black_list($str = ''){
        $params = $this->deal_admin_param($str);
        $p = empty($params['offset']) ? 0 : $params['offset']/10;
        $limit = empty($params['limit']) ? 10 : $params['limit'];
        $sort = empty($params['sort']) ? '' : $params['sort'];
        $sort_by = empty($params['order']) ? '' : $params['order'];
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

    public function reply()
    {
        $this->native_display('admin/reply.html');
    }

    public function reply_list($str = ''){
        $params = $this->deal_admin_param($str);
        $p = empty($params['offset']) ? 0 : $params['offset']/10;
        $limit = empty($params['limit']) ? 10 : $params['limit'];
        $sort = empty($params['sort']) ? '' : $params['sort'];
        $sort_by = empty($params['order']) ? '' : $params['order'];
        $where = $order_by = '';

        if(!empty($sort) && !empty($sort_by)){
            $order_by = " order by $sort $sort_by ";
        }
        //得到数据
        $list  = $this->model_reply->admin_list($p+1,$limit , $where , $order_by);
        foreach($list as &$v){
            $v['type'] = $this->type_name[$v['type']];
        }

        $total = $this->model_reply->data_count($where);

        $result = array(
            'total'=>$total,
            'rows'=>$list,
        );
        echo json_encode($result);
    }

    public function reply_delete(){
        $ids = explode(',',$_REQUEST['ids']);
        $res = $this->model_reply->delete($ids);
        if($res){
            splash('success','删除成功');
        }else{
            splash('error','删除失败,请重试');
        }
    }

    public function record()
    {
        $this->native_display('admin/record.html');
    }

    public function record_list($str = ''){
        $params = $this->deal_admin_param($str);
        $p = empty($params['offset']) ? 0 : $params['offset']/10;
        $limit = empty($params['limit']) ? 10 : $params['limit'];
        $sort = empty($params['sort']) ? '' : $params['sort'];
        $sort_by = empty($params['order']) ? '' : $params['order'];
        $where = $order_by = '';

        if(!empty($sort) && !empty($sort_by)){
            $order_by = " order by $sort $sort_by ";
        }
        //得到数据
        $list  = $this->model_record->admin_list($p+1,$limit , $where , $order_by);
        foreach($list as &$v){
            if(empty($v['ip_address'])){
                $v['ip_address'] = get_ip_local($v['ip']);
                if(!empty($v['ip_address'])) $this->model_record->update_ip_address($v['rec_id'] , $v['ip_address']);
            }
            $v['type'] = $this->type_name[$v['type']];
        }

        $total = $this->model_record->data_count($where);

        $result = array(
            'total'=>$total,
            'rows'=>$list,
        );
        echo json_encode($result);
    }

    public function record_delete(){
        $ids = explode(',',$_REQUEST['ids']);
        $res = $this->model_record->delete($ids);
        if($res){
            splash('success','删除成功');
        }else{
            splash('error','删除失败,请重试');
        }
    }

    public function access()
    {
        $this->native_display('admin/access.html');
    }

    public function access_list($str = ''){
        $params = $this->deal_admin_param($str);
        $p = empty($params['offset']) ? 0 : $params['offset']/10;
        $limit = empty($params['limit']) ? 10 : $params['limit'];
        $sort = empty($params['sort']) ? '' : $params['sort'];
        $sort_by = empty($params['order']) ? '' : $params['order'];
        $where = $order_by = '';

        if(!empty($sort) && !empty($sort_by)){
            $order_by = " order by $sort $sort_by ";
        }
        //得到数据
        $list  = $this->model_access->admin_list($p+1,$limit , $where , $order_by);
        foreach($list as &$v){
            if(empty($v['ip_address'])){
                $v['ip_address'] = get_ip_local($v['ip']);
                if(!empty($v['ip_address'])) $this->model_access->update_ip_address($v['rec_id'] , $v['ip_address']);
            }
        }

        $total = $this->model_access->data_count($where);

        $result = array(
            'total'=>$total,
            'rows'=>$list,
        );
        echo json_encode($result);
    }

    public function access_delete(){
        $ids = explode(',',$_REQUEST['ids']);
        $res = $this->model_access->delete($ids);
        if($res){
            splash('success','删除成功');
        }else{
            splash('error','删除失败,请重试');
        }
    }

    public function deal_admin_param($str){
        if(empty($str)) return array();
        if(strpos($str , '&') === false){
            $params = explode( '=' , $str);
            return array($params[0]=>$params[1]);
        }
        $data = array();
        $params = explode( '&' , $str);
        foreach($params as $p){
            $row = explode( '=' , $p);
            $data[$row[0]] = $row[1];
        }
        return $data;
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */