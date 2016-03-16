<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class article extends MY_Controller  {
    private $type = 6; //默认为6
    const table_name = 'article';
    private $tags_data = array(
                                            4=>array('感言','废话'),
                                            6=>array('恐怖/惊悚','感动','励志','怪奇'),
                                            7=>array('web前端','php','ios','mysql','linux','c/c++','java','android')
                                        );

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
        parent :: __construct();
        $this->load->model('model_article');
    }

    public function zzs($p = 0){
        $this->set_type_value(__FUNCTION__);
        $this->assign('body','body-article');
        $this->assign('title','渣渣说－搞东搞西');
        $this->assign('info','渣渣说');
        $this->assign('keywords','渣渣说');
        $this->assign('description','渣渣说');
        $this->article_list($p);
    }

    public function tale($p = 0){
        $this->set_type_value(__FUNCTION__);
        $this->assign('body','body-article');
        $this->assign('title','故事－搞东搞西');
        $this->assign('keywords','故事,恐怖,惊悚,情感,励志,怪奇');
        $this->assign('description','嘘~来看故事啦');
        $this->assign('info','故事');
        $this->article_list($p);
    }

    public function cxy($p = 0){
        $this->set_type_value(__FUNCTION__);
        $this->assign('body','body-article');
        $this->assign('title','程序猿－搞东搞西');
        $this->assign('keywords','程序员,程序猿,码农,代码,博客,php,web,ios');
        $this->assign('description','程序员');
        $this->assign('info','程序员');
        $this->article_list($p);
    }

    /*
    * 神话详情
    */
    public function detail($time,$param){
        $id = intval(get_detail_id($param));
        if(empty($id)) parent :: error_msg('你要找的内容不见啦！');
        $detail = $this->model_article->detail($id);
        if(empty($detail)) parent :: error_msg('你要找的内容不见啦！');
        $this->model_article->update_scan($id);
        $description = mb_substr(strip_tags($detail['content']), 0, 100, 'utf-8');
        $this->assign('data',$detail);
        $this->assign('body','body-detail');
        $this->assign('title',$detail['title'].'－搞东搞西');
        $this->assign('info','详情');
        $this->assign('keywords',$detail['tags']);
        $this->assign('description',$description);
        $this->display('detail.html');
    }

    /*
     * 列表
     */
    public function article_list($p = 0)
    {
        $limit = 10;
        $p = intval($p);
        $this->load->library('page');
        $where = 'where status = 1 and type = '.$this->type;
        $tags = empty($_COOKIE['tags']) ? '' : $_COOKIE['tags'] ;
        if(!empty($tags)) $where .= " and tags like '%$tags%' ";
        $search = empty($_COOKIE['search']) ? '' : $_COOKIE['search'] ;
        if(!empty($search)) $where .= " and name like '%$search%' ";


        //得到总数
        $count = $this->model_article->data_count($where);
        $total_page = ceil($count/$limit);
        if(empty($p) || $p > $total_page) $p = $total_page;
        
        //得到数据
        $list  = $this->model_article->data_list($total_page - $p,$limit,$where);
        //得到头像
        $user_res =  parent :: get_user_avatar($list);
        if(!empty($user_res)){
            $user_avatar = array_column($user_res , 'avatar' , 'user_id');
            $user_time = array_column($user_res , 'create_time' , 'user_id');
        }

        foreach($list as &$v){
            $v['user_sn'] = '';
            $v['con_id'] = $v['art_id'];
            $v['u_name'] = empty($v['user_id']) ? md5($v['email']) : $v['name'];
            if(!empty($v['user_id'])){
                $time = empty($user_time[$v['user_id']]) ? '' : $user_time[$v['user_id']];
                $v['user_sn'] = get_user_sn($v['user_id'] , $time);
            }
            $v['detail_url'] = get_detail_url($v['art_id'],$v['create_time']);
            $v['create_time'] = change_time($v['create_time']);
        }

        //生成页码
        $page = get_page($count,$limit,$total_page - $p + 1);

        $this->assign('list',$list);
        $this->assign('count',$count);
        $this->assign('page',$page);
        $this->assign('type',$this->type);
        $this->assign('tags',$this->tags_data[$this->type]);

        $this->display('article.html');
    }

    /*
     * 用户提交内容
     */
    public function save(){
        //是否拉入黑名单
        $this->load->model('model_black');
        $this->load->model('model_users');
        $res = $this->model_black->find_one();
        if($res) splash('error','你已被拉入黑名单');

        $content = trim($_REQUEST['content']);
        $data['type'] = intval($_REQUEST['type']);
        $data['tags'] = trim(strip_tags($_REQUEST['tags']));
        if(empty($data['tags'])) splash('error','请添加标签');
        //保存时保存原提交内容
        $data['content'] = trim($content);
        //验证时只保留图片和链接
        $content = strip_tags($content,'<img><a>');
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
            $data['name'] = strip_tags(trim($_REQUEST['name']));
            //已经注册过的昵称不能用
            $res_by_name = $this->model_users->get_user_by_name($data['name']);
            if(!empty($res_by_name)) splash('error','该昵称已被注册，仅本人登陆后可用');

            $data['name'] = strip_tags(trim($_REQUEST['name']));
            $data['email'] = strip_tags(trim($_REQUEST['email']));
            valid_name($data['name']);
            valid_email($data['email']);
        }

        $res  = $this->model_article->save($data);
        if($res){
            splash('success','提交成功，审核后自动发布');
        }else{
            splash('error','提交失败');
        }
    }

    /*
     * 文章内容点赞
     */
    public function article_record(){
        parent :: record(self::table_name);
    }

    public function error(){
        parent :: error_msg();
    }

    public function set_type_value($fun){
        $this->type = parent :: $all_type_data[$fun];
        $tags = empty($_COOKIE['tags']) ? '' : '['. $_COOKIE['tags'].']' ;
        $this->assign('menu',parent :: $all_type_name[$this->type].' '.$tags);
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */