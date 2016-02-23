<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class know extends MY_Controller  {
    private $_type = 2; //笑话

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
        $limit = 1;
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


     //   $this->load->view('v_images',$out);
        $this->assign('title','小知士');
        $this->assign('list',$list);
        $this->assign('page',$page);
        $this->display('know.html');
    }

    public function save(){
        $data['name'] = trim($_REQUEST['name']);
        if(empty($data['name'])) splash('error','昵称不能为空');
        $data['email'] = trim($_REQUEST['email']);
        if(empty($data['email'])) splash('error','email不能为空');
        $data['content'] = trim($_REQUEST['content']);
        if(empty($data['content'])) splash('error','内容不能为空');

        $data['type'] = $this->_type;
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
    function comment(){
        $id = $_REQUEST['id'];
        $click = $_REQUEST['click'];
        if(empty($id) || empty($click)) splash('error','try again');
        parent::record($id, $this->_type);
        $res  = $this->model_content->update($click,$id);
        if($res){
            splash('success','think you');
        }else{
            splash('error','try again');
        }
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */