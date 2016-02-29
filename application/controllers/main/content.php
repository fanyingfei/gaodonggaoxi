<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class content extends MY_Controller  {
    private $type = 0; //类型

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
            $v['content'] = strip_tags($v['content'],'<br><img>');
            $v['create_time'] = change_time($v['create_time']);
        }
        //得到总数
        $count = $this->model_content->data_count($where);
        //生成页码
        $page = get_page($count,$limit,$p);

        $this->assign('list',$list);
        $this->assign('count',$count);
        $this->assign('page',$page);
        $this->assign('type',$this->type);
        $this->display('content.html');
    }

    public function save(){
        //是否拉入黑名单
        $this->load->model('model_black');
        $res = $this->model_black->find_one();
        if($res) splash('error','你已被拉入黑名单，以后请谨慎发言');

        $data['name'] = strip_tags(trim($_REQUEST['name']));
        $data['email'] = strip_tags(trim($_REQUEST['email']));
        $content = trim($_REQUEST['content']);
        //除了图片其他全去掉看还有无内容
        valid($data['name'],$data['email'],strip_tags($content,'<img>'));
        //保存时要把图片和换行符也保存
        $data['content'] = preg_replace('/(<br\s*?\/?>)+$/i','',strip_tags($content,'<br><img>'));

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

    public function xian($p = 1){
        $this->assign('body','xian');
        $this->assign('title','闲话');
        $this->assign('info','闲话，段子，笑话，糗事，等你来说');
        $this->assign('keywords','闲话');
        $this->assign('description','闲话');
        $this->index($p);
    }

    public function know($p = 1){
        $this->assign('body','know');
        $this->assign('title','小知士');
        $this->assign('info','介绍一些生活小常识');
        $this->assign('keywords','小知士');
        $this->assign('description','小知士');
        $this->index($p);
    }

    public function wen($p = 1){
        $this->assign('body','wen');
        $this->assign('title','美文');
        $this->assign('info','美文');
        $this->assign('keywords','美文');
        $this->assign('description','美文');
        $this->index($p);
    }

    public function meizi($p = 1){
        $this->assign('body','meizi');
        $this->assign('title','妹子');
        $this->assign('info','妹子');
        $this->assign('keywords','妹子');
        $this->assign('description','妹子');
        $this->index($p);
    }


    public function myth($p = 1){
        $this->assign('body','myth');
        $this->assign('title','无聊图');
        $this->assign('info','无聊图');
        $this->assign('keywords','无聊图');
        $this->assign('description','无聊图');
        $this->index($p);
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */