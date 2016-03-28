<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class user extends MY_Controller  {

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
        $this->assign('keywords','用户中心');
        $this->assign('description','用户中心');
        $this->load->model('model_users');
    }

    public function user_info(){
        if(!is_login()){
            header_index('login');
        }
        $user = $this->model_users->get_user_by_user_id($_SESSION['user_id']);
        if(empty($user)) parent::error_msg();
        $user['avatar'] = empty($user['avatar']) ? '' : $user['avatar'];
        $user['user_sn'] = get_user_sn($user['user_id'] , $user['create_time']);

        $this->load->model('model_article');
        $this->load->model('model_content');
        $where = 'where status = 1 and user_id = '.$_SESSION['user_id'];
        $count_article = $this->model_article->data_count($where);
        $count_content = $this->model_content->data_count($where);
        $user['content_count'] = $count_article + $count_content ;

        $sex = array('M'=>'男','W'=>'女','U'=>'未知');
        $age = array('');
        for($i = 10 ; $i < 90 ; $i++){
            array_push($age,$i);
        }
        $this->assign('user',$user);
        $this->assign('sex',$sex);
        $this->assign('age',$age);
        $this->assign('select',1);
        $this->assign('title','用户中心-个人资料');
        $this->assign('body','person-center');
        $this->user_display('user/user_info.html');
    }

    public function user_avatar(){
        if(!is_login()){
            header_index('login');
        }

        $avatar = empty($_SESSION['avatar']) ? '' : $_SESSION['avatar'];

        $this->assign('select',2);
        $this->assign('avatar',$avatar);
        $this->assign('title','用户中心-修改头像');
        $this->assign('body','person-center');
        $this->user_display('user/user_avatar.html');
    }

    public function login_index($param=''){
        if(is_login()){
            header_index();
        }
        $url = empty($_SERVER['HTTP_REFERER']) ? '/' : $_SERVER['HTTP_REFERER'];
        if(strpos($url,'user') || strpos($url,'login') || strpos($url,'register')) $url = '/';

        $this->assign('url',$url);
        $this->assign('title','登录');
        $this->native_display('user/header.html');
        $this->native_display('user/login.html');
    }

    /*
     * 登陆
     */
    public function login_in(){
        if(is_login()) splash('success','登陆成功');
        $account = trim(strip_tags($_REQUEST['account']));
        $password = trim(strip_tags($_REQUEST['password']));

        if(empty($account)) splash('error','账号不存在');

        if(is_email($account)){
            $one = $this->model_users->get_user_by_email($account);
        }else{
            $one = $this->model_users->get_user_by_name($account);
        }

        if(empty($one)) splash('error','账号不存在');
        if($one['password'] != md5($password.ENCRYPTION)) splash('error','密码不正确');
        if(empty($one['is_validate']) || empty($one['name'])){
            splash('error','请先激活账号');
        }
        $this->model_users->update_login_time($one['user_id']);
        $_SESSION['user_id'] = $one['user_id'];
        $_SESSION['email'] = $one['email'];
        $_SESSION['name'] = $one['name'];
        $_SESSION['is_admin'] = empty($one['is_admin']) ? 0 : $one['is_admin'];
        if(!empty( $one['avatar'])) $_SESSION['avatar'] = $one['avatar'];

        my_set_cookie('is_login',1);
        my_set_cookie('name', $one['name']);
        my_set_cookie('email',  $one['email']);
        my_set_cookie('PHPSESSID',session_id());

        $url = trim($_REQUEST['referer_url']);
        splash('success','登陆成功',array('url'=>empty($url) ? '/' : $url));
    }

    public function login_out(){
        session_destroy();
        expire_cookie('is_login');
        $url = empty($_SERVER['HTTP_REFERER']) ? '/' : $_SERVER['HTTP_REFERER'];
        if(strpos($url,'user') || strpos($url,'login') || strpos($url,'register')) $url = '/';
        header_index($url);
    }

    public function register($param=''){
        $this->assign('title','注册');
        $this->native_display('user/header.html');
        $this->native_display('user/register.html');
    }

    public function register_save(){
        //是否拉入黑名单
        $this->load->model('model_black');
        $res = $this->model_black->find_one();
        if($res) splash('error','你已被拉入黑名单');

        $data['email'] = trim(strip_tags($_REQUEST['email']));
        $data['code'] = $code = trim(strip_tags($_REQUEST['code']));
        $data['password'] = trim(strip_tags($_REQUEST['password']));
        $data['confirm'] = trim(strip_tags($_REQUEST['confirm']));

        register_valid($data);

        unset($data['confirm']);
        unset($data['code']);
        $res_by_email = $this->model_users->get_user_by_email($data['email']);
        if(!empty($res_by_email) && $res_by_email['is_validate'] == 1){
            //邮箱已被注册并激活了
            splash('error','该邮箱已被注册，不可使用');
        }elseif(!empty($res_by_email) && $res_by_email['is_validate'] == 0){
            //邮箱已被注册但没有激活
            $data = $res_by_email;
        }elseif(empty($res_by_email)){
            $data['password'] = md5($data['password'].ENCRYPTION);
            $data['user_id'] = $this->model_users->save($data);
        }else{
            splash('error','注册失败，请刷新重试');
        }

        if($data['user_id']){
            $email_content = get_email_content($data['user_id'],$data['email']);
            $res = my_send_email($data['email'],'账号激活',$email_content);
            if($res){
                splash('success','注册成功，收到邮件后请激活账号');
            }else{
                splash('success','注册成功，邮件发送失败，请联系邮箱 '.EMAIL_NUMBER);
            }
        }else{
            splash('error','注册失败,请重试');
        }
    }

    /*
     * 激活账号，填昵称页面
     */
    public function user_validate($str){
        $param = json_decode(base64_decode($str),true);

        $time = $param['time'];
        if(time() - $time > 24*3600){
            parent::error_msg('链接已失效，请联系'.EMAIL_NUMBER .'重新发送');
        }
        $user_id = intval($param['user_id']);
        if(empty($user_id)) parent::error_msg('出错啦');

        $user_info = $this->model_users->get_user_by_user_id($user_id);
        if(empty($user_info) || $user_info['email'] != $param['email']){
            parent::error_msg('出错啦');
        }
        if(!empty($user_info['is_validate']) && !empty($user_info['name'])){
            header_index('login');
        }
        $this->assign('title','完善资料');
        $this->assign('unique_id',$user_id);
        $this->native_display('user/header.html');
        $this->native_display('user/nick_name.html');
    }

    public function nick_save(){
        $id = intval($_REQUEST['id']);
        $name = trim(strip_tags($_REQUEST['name']));

        if(empty($id)) splash('error','激活失败，请刷新重试');
        valid_name($name);

        $user_info = $this->model_users->get_user_by_user_id($id);
        if(empty($user_info)) splash('error','激活失败，请刷新重试');

        if(!empty($user_info['name']) && !empty($user_info['is_validate'])){
            splash('error','该账号已激活');
        }

        $res_by_name = $this->model_users->get_user_by_name($name);
        if(!empty($res_by_name) && $res_by_name['user_id'] != $id) splash('error','该昵称已被注册，不可使用');
        $res = $this->model_users->user_validate($id,$name);
        if($res){
            expire_cookie('is_login');
            splash('sucess','激活成功，立即登录');
        }else{
            splash('error','激活失败,请重试');
        }
    }

    public function info_save(){
        //没有登陆直接跳登陆页
        if(!is_login()) header_index('login');
        $user_id = $_SESSION['user_id'];
        if(empty($user_id)) splash('error','保存失败,请重试');
        $data['mobile'] = trim(strip_tags($_REQUEST['mobile']));
        $data['weixin'] = trim(strip_tags($_REQUEST['weixin']));
        $data['sina'] = trim(strip_tags($_REQUEST['sina']));
        $data['age'] = trim(strip_tags($_REQUEST['age']));
        $data['sex'] = trim(strip_tags($_REQUEST['sex']));
        $data['qq'] = trim(strip_tags($_REQUEST['qq']));
        if(!empty($data['mobile'])) valid_mobile($data['mobile']);
        $res = $this->model_users->update_user_info($user_id,$data);
        if($res){
            splash('sucess','保存成功');
        }else{
            splash('error','保存失败,请重试');
        }
    }

    public function avatar_save(){
        if(!is_login()) header_index('login');
        $user_id = $_SESSION['user_id'];
        $data['avatar'] = trim(strip_tags($_REQUEST['avatar']));
        if(empty($data['avatar'])) splash('error','请输入图片url');
        $res = $this->model_users->update_user_info($user_id,$data);
        if($res){
            $_SESSION['avatar'] = $data['avatar'];
            splash('sucess','保存成功');
        }else{
            splash('error','保存失败,请重试');
        }
    }

    /*
      * 查看某用户发表的全部内容
      */
    public function member($user_sn){
        $user_id = substr($user_sn , 8 );
        $user_time = substr($user_sn , 0 , 8);
        if(empty($user_sn) || empty($user_id)){
            parent :: error_msg('该用户不存在');
        }

        $this->load->model('model_article');
        $this->load->model('model_content');
        $user_info = $this->model_users->get_user_by_user_id($user_id);
        if(empty($user_info)) parent :: error_msg('该用户不存在');
        if(date('Ymd',strtotime($user_info['create_time'])) != $user_time){
            parent :: error_msg('该用户不存在');
        }

        $count = 0;
        $where = 'where status = 1 and user_id = '.$user_id;
        $group_article_count = $this->model_article->group_count_by_type($where);
        $group_content_count = $this->model_content->group_count_by_type($where);
        $group_count = array_merge($group_content_count,$group_article_count);
        foreach($group_count as &$value){
            $value['type_name'] = parent :: $all_type_name[$value['type']];
        }

        $group_num = array();
        foreach ($group_count as $group) {
            $group_num[] = $group['num'];
        }
        array_multisort($group_num, SORT_DESC , $group_count);

        $this->assign('body','member');
        $this->assign('title',$user_info['name'].'－搞东搞西');
        $this->assign('menu',$user_info['name']);
        $this->assign('keywords',$user_info['name']);
        $this->assign('description',$user_info['name']);
        $this->assign('user',$user_info);
        $this->assign('group_count',$group_count);
        $this->assign('initial_type',$group_count[0]['type']); //最多的一类

        $this->native_display('main/header.html');
        $this->native_display('main/member.html');
        $this->native_display('main/footer.html');
    }

    /*
    * 查看某用户发表的全部内容
    */
    public function member_list(){
        $limit = 10;
        $p = intval($_REQUEST['page']);
        $type = intval($_REQUEST['type']);
        $user_id = intval($_REQUEST['id']);

        $this->load->library('page');
        $where = 'where status = 1 and user_id = '.$user_id;
        if(!empty($type)) $where .= ' and type = '.$type;

        if(in_array($type,parent :: $detail_data)){
            $is_detail = 1;
            $model_table_name = 'model_article';
        }else{
            $is_detail = 0;
            $model_table_name = 'model_content';
        }
        $this->load->model($model_table_name);
        //得到总数
        $count = $this->$model_table_name->data_count($where);

        $total_page = ceil($count/$limit);
        if(empty($p) || $p > $total_page) $p = $total_page;

        //得到数据
        $list  = $this->$model_table_name->data_list($total_page - $p,$limit,$where);
        //得到头像
        $user_res =  parent :: get_user_avatar($list);
        if(!empty($user_res)){
            $user_avatar = my_array_column($user_res , 'avatar' , 'user_id');
            $user_time = my_array_column($user_res , 'create_time' , 'user_id');
        }

        foreach($list as &$v){
            if(empty($v['con_id'])) $v['con_id'] = $v['art_id'];
            if($is_detail == 1){
                $v['detail_url'] =  get_detail_url($v['art_id'],$v['create_time']);
                $v['year'] = substr($v['create_time'], 0 , 7);
                $v['day'] = substr($v['create_time'], 8 , 2);
            }else{
                if($v['con_id'] < 145){
                    if($res_content = gif_static_gif($v['content'])) $v['content'] = $res_content;
                    $v['content'] = filter_content_br($v['content']);
                }
            }
            $v['create_time'] = change_time($v['create_time']);
            $v['u_name'] = empty($v['user_id']) ? md5($v['email']) : $v['name'];
        }

        //生成页码
        $page = get_page($count,$limit,$total_page - $p + 1,'ajax_page');

        $out = array('list'=>$list,'count'=>$count,'page'=>$page , 'is_detail'=>$is_detail , 'type'=>$type);
        splash('success','',$out);
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */