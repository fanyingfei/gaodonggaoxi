<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Member extends MY_Controller  {
    private $sex_data = array('W'=>'女','M'=>'男','U'=>'未知');
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
        $this->get_nav_list();
        $this->assign('keywords','用户中心');
        $this->assign('description','用户中心');
    }

    public function user_info(){
        if(!is_login()){
            header_index('login');
        }
        $where = 'where user_id = '.$_SESSION['user_id'];
        $user = $this->users_model->GetRow($where);
        if(empty($user)) $this->error_msg();
        $user['avatar'] = empty($user['avatar']) ? '' : $user['avatar'];
        $sex = $this->sex_data;
        $age = array('0'=>'不填');
        $max_age = date('Y') - 5;
        for($i = 1960 ; $i < $max_age ; $i++){
            $age[$i] = $i;
        }

        $this->assign('user',$user);
        $this->assign('sex',$sex);
        $this->assign('age',$age);
        $this->assign('select',1);
        $this->assign('title','用户中心-个人资料');
        $this->assign('body','person-center');
        $this->user_display('member/user_info.html');
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
        $this->user_display('member/user_avatar.html');
    }

    public function user_pass(){
        if(!is_login()){
            header_index('login');
        }
        $this->assign('select',3);
        $this->assign('title','用户中心-修改密码');
        $this->assign('body','person-center');
        $this->user_display('member/user_pass.html');
    }

    public function info_save(){
        //没有登陆直接跳登陆页
        if(!is_login()) splash('error','请先登录');
        $user_id = $_SESSION['user_id'];
        if(empty($user_id)) splash('error','保存失败,请重试');
        $data['mobile'] = trim(strip_tags($_REQUEST['mobile']));
        $data['weixin'] = trim(strip_tags($_REQUEST['weixin']));
        $data['email'] = trim(strip_tags($_REQUEST['email']));
        if($data['email'] != $_SESSION['email']) $data['is_validate'] = 0;
        $data['year'] = trim(strip_tags($_REQUEST['year']));
        $data['sex'] = trim(strip_tags($_REQUEST['sex']));
        $data['qq'] = trim(strip_tags($_REQUEST['qq']));
        if(empty($data['sex'])) $data['sex'] = 'U';
        if(!empty($data['mobile'])) valid_mobile($data['mobile']);
        $res = $this->users_model->Update(array('user_id'=>$user_id),$data);
        if($res){
            splash('sucess','保存成功');
        }else{
            splash('error','保存失败,请重试');
        }
    }

    public function valid_email(){
        if(!is_login()) header_index('login');
        $email = trim($_REQUEST['email']);
        $user_id = $_SESSION['user_id'];
        $where = "where email = '$email' and is_validate = 1 and user_id != $user_id";
        $user_by_email = $this->users_model->GetRow($where);
        if(!empty($user_by_email)) splash('error','该邮箱已被注册');

        $where = 'where user_id = '.$user_id;
        $user_info = $this->users_model->GetRow($where);
        if($email != $user_info['email']){
            $_SESSION['email'] = $email;
            $this->users_model->Update(array('user_id'=>$user_id),array('email'=>$email,'is_validate'=>0));
        }else{
            if($user_info['is_validate'] == 1) splash('error','邮箱已验证');
        }
        $email_content = get_email_content($user_id,$email);
        my_send_email($email,'邮箱验证',$email_content);
    }

    public function avatar_save(){
        if(!is_login()) splash('error','请先登录');
        $user_id = $_SESSION['user_id'];
        $data['avatar'] = trim(strip_tags($_REQUEST['avatar']));
        if(empty($data['avatar'])) splash('error','请输入图片url');
        $res = $this->users_model->Update(array('user_id'=>$user_id),$data);
        if($res){
            $_SESSION['avatar'] = $data['avatar'];
            splash('sucess','保存成功');
        }else{
            splash('error','保存失败,请重试');
        }
    }

    public function pass_save(){
        //没有登陆直接跳登陆页
        if(!is_login()) splash('error','请先登录');
        $user_id = $_SESSION['user_id'];
        if(empty($user_id)) splash('error','保存失败,请重试');
        $old_pass = trim(strip_tags($_REQUEST['old_pass']));
        $new_pass = trim(strip_tags($_REQUEST['new_pass']));
        $confirm_pass = trim(strip_tags($_REQUEST['confirm_pass']));

        $where = 'where user_id = '.$user_id;
        $user_info = $this->users_model->GetRow($where);
        if(md5($old_pass.ENCRYPTION) != $user_info['password']) splash('error','原密码输入不正确');

        if($old_pass == $new_pass) splash('sucess','保存成功');
        if($new_pass != $confirm_pass) splash('error','前后密码不一致');

        $data['password'] = md5($new_pass.ENCRYPTION);
        $res = $this->users_model->Update(array('user_id'=>$user_id),$data);
        if($res){
            splash('sucess','修改成功');
        }else{
            splash('error','修改失败,请重试');
        }
    }

    /*
     * 我的主页
     */
    public function homepage(){
        if(!is_login()) header_index('login');
        $this->member_index('88888888'.$_SESSION['user_id']);
    }

    /*
      * 查看某用户发表的全部内容
      */
    public function member_index($user_sn){
        $user_id = substr($user_sn , 8 );
        if(empty($user_sn)){
            $this->error_msg('该用户不存在');
        }

        $where = 'where user_id = '.$user_id;
        $user_info = $this->users_model->GetRow($where);

        if(empty($user_info)) $this-> error_msg('该用户不存在');
        if(empty($user_info['sex']))  $user_info['sex'] = 'U';
        $user_info['sex'] = $this->sex_data[$user_info['sex']];
        $user_info['age'] = empty($user_info['year']) ? '未知' : date('Y') - $user_info['year'];
        if(empty($user_info['avatar'])) $user_info['avatar'] = '/resources/images/login/logo.jpg';

        $this->assign('body','body-member');
        $this->assign('title',$user_info['name'].'－搞东搞西');
        $this->assign('menu',$user_info['name']);
        $this->assign('keywords',$user_info['name']);
        $this->assign('description',$user_info['name']);
        $this->assign('user',$user_info);

        $count = 0;
        $where = 'where status = 1 and user_id = '.$user_id;
        $group_article_count = $this->article_model->GetCountGroupBy($where , 'type');
        $group_content_count = $this->content_model->GetCountGroupBy($where , 'type');
        $group_count = array_merge($group_content_count,$group_article_count);
        if(empty($group_count)){
            $this->display('member_empty.html');exit;
        }

        $nav_res = $this->get_nav_list();
        $nav_list = $nav_res['type'];
        foreach($group_count as $key=>&$value){
            if(!empty($nav_list[$value['type']]['is_view'])){
                $value['type_name'] = $nav_list[$value['type']]['name'];
            }else{
                unset($group_count[$key]);
            }
        }

        $group_num = array();
        foreach ($group_count as $group) {
            $group_num[] = $group['num'];
        }
        array_multisort($group_num, SORT_DESC , $group_count);

        $this->assign('group_count',$group_count);
        $this->assign('initial_type',$group_count[0]['type']); //最多的一类

        $this->display('member.html');
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

        $nav_info = $this->get_nav_info($type);
        $is_detail = $nav_info['is_detail'];
        $table_name = $nav_info['table_name'];
        //得到总数
        $count = $this->$table_name->GetTotal($where);

        $total_page = ceil($count/$limit);
        if(empty($p) || $p > $total_page) $p = $total_page;

        //得到数据
        $list  = $this->$table_name->GetAll($where, '' ,$total_page - $p,$limit);
        //得到头像
        $avatar = $this->users_model->GetRowByKey($user_id);

        foreach($list as &$v){
            if($is_detail == 1){
                $v['detail_url'] =  get_detail_url($v['con_id'],$v['create_time']);
                $v['year'] = substr($v['create_time'], 0 , 7);
                $v['day'] = substr($v['create_time'], 8 , 2);
            }
            $v['avatar'] = $avatar['avatar'];
            $v['create_time'] = change_time($v['create_time']);
            $v['u_name'] = empty($v['user_id']) ? md5($v['email']) : $v['name'];
        }

        //生成页码
        $page = get_page($count,$limit,$total_page - $p + 1,'ajax_page');

        $out = array('list'=>$list,'count'=>$count,'page'=>$page , 'is_detail'=>$is_detail);
        splash('success','',$out);
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */