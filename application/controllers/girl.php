<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class girl extends MY_Controller  {

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
        $this->load->model('model_girl');
    }


    public function index($p = 1)
	{
        $res = array(array('id'=>1,'name'=>'fanfan','price'=>44,'age'=>8));
        echo json_encode($res);exit;
        $limit = 1;
        $this->load->library('page');
        $this->load->model('model_girl');
        //得到数据
        $list  = $this->model_girl->girl_list($p,$limit);
        if(empty($list)){
            $this->display('index.html');
            exit;
        }
        //得到总数
        $count = $this->model_girl->girl_count();
        //生成页码
        $page = get_page($count,$limit,$p);


     //   $this->load->view('v_images',$out);
        $this->assign('list',$list);
        $this->assign('page',$page);
        $this->display('girl.html');
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */