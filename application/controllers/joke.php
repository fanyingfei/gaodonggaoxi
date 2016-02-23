<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class joke extends MY_Controller  {
    private $_type = 1; //笑话

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
        $this->load->library('page');
        //得到数据
        $list  = $this->model_content->data_list($p,$limit,$this->_type);
        if(empty($list)){
            $this->display('index.html');
            exit;
        }
        foreach($list as &$v){
            $v['u_name'] = md5($v['email']);
        }
        //得到总数
        $count = $this->model_content->data_count($this->_type);
        //生成页码
        $page = get_page($count,$limit,$p);

        $this->assign('title','段子');
        $this->assign('list',$list);
        $this->assign('count',$count);
        $this->assign('page',$page);
        $this->display('joke.html');
    }

    public function save(){
        parent::content_save($this->_type);
    }

    /*
     * 点赞
     */
    function comment(){
        parent::record($this->_type);
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */