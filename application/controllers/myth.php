<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class myth extends MY_Controller  {
    private $_type = 101; //神话

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
        $this->load->model('model_article');
    }


    public function index($p = 1)
	{
        $limit = 10;
        $this->load->library('page');
        //得到数据
        $list  = $this->model_article->data_list($p,$limit,$this->_type);
        if(empty($list)){
            $this->display('index.html');
            exit;
        }
        foreach($list as &$v){
            $v['u_name'] = md5($v['email']);
            $v['content'] = preg_replace("/<img(.*?)\/>/", "", $v['content']);
            $v['content'] = mb_substr($v['content'], 0, 150, 'utf-8');
        }
        //得到总数
        $count = $this->model_article->data_count($this->_type);
        //生成页码
        $page = get_page($count,$limit,$p);

        $this->assign('title','神话');
        $this->assign('count',$count);
        $this->assign('list',$list);
        $this->assign('page',$page);
        $this->display('myth.html');
    }

    public function detail($id){
        $detail = $this->model_article->detail($id);
        $this->assign('title',$detail['title']);
        $this->assign('data',$detail);
        $this->display('detail.html');
    }

    public function save(){
        $data['name'] = trim($_REQUEST['name']);
        $data['email'] = trim($_REQUEST['email']);
        $data['title'] = trim($_REQUEST['myth_title']);
        $data['content'] = str_replace('/\n/g','<br/>',trim($_REQUEST['content']));
        valid_msg($data['name'],$data['email'],$data['title'],$data['content']);
        //是否拉入黑名单
        $this->load->model('model_black');
        $res = $this->model_black->find_one();
        if($res) error_msg('你已被拉入黑名单，以后请谨慎发言');

        $data['type'] = $this->_type;
        $this->model_article->save($data);
        header("Location: http://".$_SERVER['HTTP_HOST'].'/myth');
    }

    /*
     * 点赞
     */
    function comment(){
        parent::record($this->_type,'model_article');
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */