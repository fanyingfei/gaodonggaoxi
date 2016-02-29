<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class admin extends MY_Controller  {
    private $status_msg_data = array(0=>'审核中',1=>'通过',2=>'没通过');
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
        $where = '';
        $p = intval($p);

        $this->load->library('page');

        //得到数据
        $list  = $this->model_content->data_list($p,$limit,$where);
        foreach($list as &$v){
            $v['status_msg'] = $this->status_msg_data[$v['status']];
            $v['is_user'] = empty($v['user_id']) ? '是' : '否';
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
        $this->admin_display('admin/content.html');
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */