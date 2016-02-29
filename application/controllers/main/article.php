<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class article extends MY_Controller  {
    private $_type = 0;

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
        $this->load->model('model_content');
    }


    public function index($p = 1)
	{
        $limit = 10;
        $p = intval($p);

        $this->type = get_type();
        $this->load->library('page');

        $where = 'where status = 1 and type = '.$this->type;

        $search = empty($_COOKIE['search']) ? '' : $_COOKIE['search'] ;
        if(!empty($search)) $where .= " and name like '%$search%' ";
        //得到数据
        $list  = $this->model_content->data_list($p,$limit,$where);
        foreach($list as &$v){
            $v['u_name'] = md5($v['email']);
            $v['content'] = mb_substr(strip_tags($v['content']), 0, 150, 'utf-8').'...';
            $v['title'] = empty($v['title']) ? mb_substr($v['content'], 0, 20, 'utf-8').'...' : $v['title'];
            $v['create_time'] = change_time($v['create_time']);
        }
        //得到总数
        $count = $this->model_content->data_count($where);
        //生成页码
        $page = get_page($count,$limit,$p);

        $this->assign('list',$list);
        $this->assign('page',$page);
        $this->assign('count',$count);
        $this->assign('type',$this->type);
        $this->display('article.html');
    }

    public function detail($id){
        $id = intval($id);
        $detail = $this->model_content->detail($id);
        $detail['content'] = strip_tags($detail['content'],'<img><p><br>');
        $this->assign('data',$detail);
        $this->assign('body','myth');
        $this->assign('title','神话');
        $this->assign('info','神话');
        $this->assign('keywords','神话');
        $this->assign('description','神话');
        $this->display('detail.html');
    }

    public function save(){
        $data['name'] = strip_tags(trim($_REQUEST['name']));
        $data['email'] = strip_tags(trim($_REQUEST['email']));
        $content = trim($_REQUEST['content']);
        //除了图片其他全去掉看还有无内容
        valid($data['name'],$data['email'],strip_tags($content,'<img>'));
        //保存时要把图片和换行符也保存
        $data['content'] = preg_replace('/(<br\s*?\/?>)+$/i','',strip_tags($content,'<p><br><img>'));
        $data['title'] = strip_tags(trim($_REQUEST['title']));
        if(empty($data['title'])) splash('error','请填写标题');

        //是否拉入黑名单
        $this->load->model('model_black');
        $res = $this->model_black->find_one();
        if($res) splash('error','你已被拉入黑名单，以后请谨慎发言');

        $data['type'] = intval($_REQUEST['type']);
        $res  = $this->model_content->save($data);
        if($res){
            splash('success','提交成功');
        }else{
            splash('error','提交失败');
        }
    }

    /*
     * 点赞
     */
    public function comment(){
        parent::record();
    }

    public function myth($p = 1){
        $this->assign('body','myth');
        $this->assign('title','神话');
        $this->assign('info','神话');
        $this->assign('keywords','神话');
        $this->assign('description','神话');
        $this->index($p);
    }

    public function zzs($p = 1){
        $this->assign('body','zzs');
        $this->assign('title','渣渣说');
        $this->assign('info','渣渣说');
        $this->assign('keywords','渣渣说');
        $this->assign('description','渣渣说');
        $this->index($p);
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */