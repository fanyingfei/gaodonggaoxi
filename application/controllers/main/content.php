<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class content extends MY_Controller  {

    private $sort_data = array(
        'new'=>array('name'=>'最新','value'=>'con_id desc'),
        'ago'=>array('name'=>'最早','value'=>'con_id asc'),
        'good'=>array('name'=>'最赞','value'=>'good desc'),
        'hot'=>array('name'=>'热评','value'=>'reply desc'),
        'rand'=>array('name'=>'随机','value'=>'random')
    );

    public function __construct() {
        parent::__construct();
        $this->get_nav_list();
        $this->load->model('model_content');
        $this->load->model('model_article');
    }

    public function pic($p = 0 , $s = ''){
        $this->init($p , $s , __FUNCTION__);
    }

    public function duan($p = 0 , $s = ''){
        $this->init($p , $s , __FUNCTION__);
    }

    public function meizi($p = 0, $s = ''){
        $this->init($p , $s , __FUNCTION__);
    }

    public function zzs($p = 0, $s = ''){
        $this->assign('is_show',0);
        $this->init($p , $s , __FUNCTION__);
    }

    public function tale($p = 0, $s = ''){
        $this->assign('is_show',1);
        $this->init($p , $s , __FUNCTION__);
    }

    public function cxy($p = 0, $s = ''){
        $this->assign('is_show',1);
        $this->init($p , $s , __FUNCTION__);
    }

    public function markdown(){
        $this->native_display('main/markdown.html');
    }

    /*
     * 列表
     */
    public function content_list($param)
    {
        $limit = 10;
        $p = intval($param['page']);
        $type = $param['type'];
        $sort = $param['sort'];
        $search = $param['search'];
        $is_detail = $param['is_detail'];

        $this->load->library('page');
        $where = 'where status = 1 and type = '.$type;


        if(empty($is_detail)){
            $html_name = 'content.html';
            $table_name = 'model_content';
            if(!empty($search)) $where .= " and (name like '%$search%' or content like '%$search%') ";
        }else{
            $html_name = 'article.html';
            $table_name = 'model_article';
            if(!empty($search)) $where .= " and (name like '%$search%'  or title like '%$search%'  or tags like '%$search%') ";
        }

        //得到总数
        $count = $this->$table_name->GetTotal($where);
        if($sort == 'rand'){
            $page = mt_rand(0 , ceil($count/$limit)-1);
            $list = $this->$table_name->GetAll($where ,'', $page ,$limit);
            shuffle($list);
            $page = '<div onclick="window.location.href=window.location.href"><a>再随一次</a></div>';
        }else{
            $sort_data = $this->sort_data;
            $sort_value  = empty($sort) || empty($sort_data[$sort]) ? '' : $sort_data[$sort]['value'];
            $total_page = ceil($count/$limit);
            if(empty($p) || $p > $total_page) $p = $total_page;
            //得到数据
            $list  = $this->$table_name->GetAll($where,$sort_value,$total_page - $p,$limit);
            //生成页码
            $page = get_page($count,$limit,$total_page - $p + 1);
        }

        //得到头像
        $user_res =  $this->get_user_avatar($list);
        if(!empty($user_res)){
            $user_avatar = array_column($user_res , 'avatar' , 'user_id');
            $user_time = array_column($user_res , 'create_time' , 'user_id');
        }

        foreach($list as &$v){
            $v['user_sn'] = $v['avatar'] = '';
            $v['u_name'] = empty($v['user_id']) ? md5($v['email']) : $v['name'];
            if(!empty($v['user_id'])){
                $v['avatar'] = empty($user_avatar[$v['user_id']]) ? '' : $user_avatar[$v['user_id']];
                $time = empty($user_time[$v['user_id']]) ? '' : $user_time[$v['user_id']];
                $v['user_sn'] = get_user_sn($v['user_id'] , $time);
            }
            if(!empty($is_detail)){
                $v['tags'] = explode(' ' , $v['tags']);
                $v['detail_url'] = get_detail_url($v['con_id'],$v['create_time']);
                $v['year'] = substr($v['create_time'], 0 , 7);
                $v['day'] = substr($v['create_time'], 8 , 2);
            }

            $v['create_time'] = change_time($v['create_time']);
        }

        $this->assign('list',$list);
        $this->assign('count',$count);
        $this->assign('page',$page);

        $this->display($html_name);
    }


    public function content_detail($time,$param){
        $id = intval(get_detail_id($param));
        $where = 'where con_id = '.$id;
        $detail  = $this->model_content->GetRow($where);
        $detail['create_time'] = change_time($detail['create_time']);
        $detail['user_sn'] = $detail['avatar'] = '';
        $detail['u_name'] = empty($detail['user_id']) ? md5($detail['email']) : $detail['name'];
        if(!empty($detail['user_id'])){
            $this->load->model('model_users');
            $where = 'where user_id = '.$detail['user_id'];
            $user_res = $this->model_users->GetRow($where);
            $detail['avatar'] = $user_res['avatar'];
            $detail['user_sn'] = get_user_sn($detail['user_id'] , $user_res['create_time']);
        }
        $this->assign('one',$detail);
        $this->assign('type',$detail['type']);
        $this->assign('body','body-single');
        $this->assign('title','搞东搞西－搞搞东西');
        $this->assign('menu','搞笑－开开心心每一天');
        $this->assign('keywords','闲话,无聊,段子,轻松,内涵段子,神回复,冷笑话,趣事,糗事,成人笑话,GIF图');
        $this->assign('description','搞东搞西搞笑专区，快乐每一天，爆笑笑不停');

        $this->display('single.html');
    }

    /*
    * 文章详情
    */
    public function article_detail($time,$param){
        $id = intval(get_detail_id($param));
        if(empty($id)) parent :: error_msg('你要找的内容不见啦！');
        $where = "where con_id = $id";
        $detail = $this->model_article->GetRow($where);
        if(empty($detail)) parent :: error_msg('你要找的内容不见啦！');
        $this->scan_record($id);
        //   $detail['content'] = strip_tags($detail['content'],'<img><br>');
        $detail['create_time'] = substr($detail['create_time'] , 0 , 10);
        $description = mb_substr(str_replace(array('"','\'',' '),'',strip_tags($detail['content'])), 0, 100, 'gbk');
        $this->assign('data',$detail);
        $this->assign('body','body-detail');
        $this->assign('title',$detail['title'].'－搞东搞西');
        $this->assign('keywords',$detail['tags'].' 搞东搞西');
        $this->assign('description',empty($description) ? $detail['title'] : $description);

        $this->display('detail.html');
    }

    /*
     * 记录浏览
     */
    public function scan_record($id){
        $this->load->model('model_record');
        $type = -1;  //文章详情浏览专用
        $ip = get_real_ip();
        $where = "where row_id = $id and type = $type and ip = '$ip'";
        $res = $this->model_record->GetRow($where);
        if(empty($res)){
            $data = array('type'=>$type ,'row_id'=>$id,'ip'=>$ip,'create_time'=>date('Y-m-d H:i:s'));
            $list  = $this->model_record->save($data);
            $this->model_article->UpdateNum($id , 'scan');
        }
    }

    /*
     * 用户提交内容
     */
    public function content_save(){
        //是否拉入黑名单
        $this->is_black();

        $this->load->model('model_users');
        $data['type'] = intval($_REQUEST['type']);
        $data['content'] = $this->deal_content($_REQUEST['content']);

        if(is_login()){
            //已登陆用户
            $data['user_id'] = $_SESSION['user_id'];
            $data['name'] = $_SESSION['name'];
            $data['email'] = $_SESSION['email'];
        }else{
            $data['name'] = $name = strip_tags(trim($_REQUEST['name']));
            //已经注册过的昵称不能用
            $where = "where name = '$name'";
            $res_by_name = $this->model_users->GetRow($where);
            if(!empty($res_by_name)) splash('error','该昵称已被注册，仅本人登陆后可用');

            $data['name'] = strip_tags(trim($_REQUEST['name']));
            $data['email'] = strip_tags(trim($_REQUEST['email']));
            valid_name($data['name']);
            valid_email($data['email']);
        }
        $data['create_time'] = date('Y-m-d H:i:s');
        $data['ip'] = get_real_ip();
		if(!empty($_SESSION['is_admin'])) $data['status'] = 1;
        $res  = $this->model_content->Save($data);
        if($res){
            splash('success','提交成功，审核后自动发布');
        }else{
            splash('error','提交失败');
        }
    }

    public function article_save(){
        //是否拉入黑名单
        $this->is_black();

        $this->load->model('model_users');
        $data['type'] = intval($_REQUEST['type']);
        $data['tags'] = trim(strip_tags($_REQUEST['tags']));
        if(empty($data['tags'])) splash('error','请添加标签');

        $content = trim($_REQUEST['content']);
		$data['content'] = str_replace(array('“','”'),'"',$content);
        if(empty($content)) splash('error','请填写内容');

        $title = trim(strip_tags($_REQUEST['title']));
        if(empty($title)) splash('error','请填写标题');
        $data['title'] = $title;

        if(is_login()){
            //已登陆用户
            $data['user_id'] = $_SESSION['user_id'];
            $data['name'] = $_SESSION['name'];
            $data['email'] = $_SESSION['email'];
        }else{
            $data['name'] = $name = strip_tags(trim($_REQUEST['name']));
            //已经注册过的昵称不能用
            $where = "where name = '$name'";
            $res_by_name = $this->model_users->GetRow($where);
            if(!empty($res_by_name)) splash('error','该昵称已被注册，仅本人登陆后可用');

            $data['name'] = strip_tags(trim($_REQUEST['name']));
            $data['email'] = strip_tags(trim($_REQUEST['email']));
            valid_name($data['name']);
            valid_email($data['email']);
        }
        $data['create_time'] = date('Y-m-d H:i:s');
        $data['ip'] = get_real_ip();
        if(!empty($_SESSION['is_admin'])) $data['status'] = 1;
        $res  = $this->model_article->Save($data);
        if($res){
            splash('success','提交成功，审核后自动发布');
        }else{
            splash('error','提交失败');
        }
    }

    /*
     * 主要内容点赞
     */
    public function content_record(){
        $this->record('content');
    }

    /*
     * 文章内容点赞
     */
    public function article_record(){
        $this->record('article');
    }


    /*
     * 保存时处理内容
     */
    public function deal_content($content){
        $content = str_replace(array('“','”'),'"',$content);
        $valid_content = trim(strip_tags($content,'<img>'));
        if(empty($valid_content)) splash('error','请填写内容');
        $content = strip_tags($content,'<img><a><br>');
        if($res_content = gif_static_gif($content)) $content = $res_content;
        return filter_content_br($content);
    }

    public function error(){
        parent :: error_msg();
    }


    public function init($p , $s , $nav){
        $flag = 0;
        $data['sort'] = $s;
        $data['type'] = 1;
        $data['page'] = $p;
        $data['search'] = '';
        if(array_key_exists($p,$this->sort_data)){
            $data['sort'] = $p;
            $data['page'] = $s;
        }
        $cur_sort = empty($data['sort']) ? 'new' : $data['sort'];

        $nav_list = $this->get_nav_list();
        foreach($nav_list as $val){
            if($nav != $val['alias']) continue;
            $flag = 1;
            if(empty($val['is_detail'])){
                $body = 'body-content body-'.$nav;
            }else{
                $body = 'body-article body-'.$nav;
            }
            $title = $val['name'].'－搞东搞西';
            $description = $val['description'];
            $keywords = $val['keywords'];
            $tags = explode(',',$val['tags']);
            $menu = $val['desc'];
            $data['type'] = $val['type'];
            $data['is_detail'] = $val['is_detail'];
            break;
        }

        if($flag == 0) header_index();

        if(!empty($_COOKIE['search'])){
            $data['search'] = trim($_COOKIE['search']);
            cookie_expire('search');
        }

        $this->assign('nav',$nav);
        $this->assign('title',$title);
        $this->assign('tags',$tags);
        $this->assign('body',$body);
        $this->assign('menu',$menu);
        $this->assign('cur_sort', $cur_sort);
        $this->assign('type',$data['type']);
        $this->assign('keywords',$keywords);
        $this->assign('search',$data['search']);
        $this->assign('sort', $this->sort_data);
        $this->assign('description',$description);

        $this->content_list($data);
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */