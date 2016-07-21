<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Count extends MY_Controller  {
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
        if(!is_login() || $_SESSION['is_admin'] != 1){
            echo  'you have no permission to do this. ';
            exit;
        }
    }

    public function count_content(){
        $this->assign('end_time',date('Y-m-d'));
        $this->assign('start_time',date('Y-m-d',strtotime('-1 month')));
        $this->native_display('admin/count_content.html');
    }

    public function count_access(){
        $this->assign('end_time',date('Y-m-d'));
        $this->assign('start_time',date('Y-m-d',strtotime('-1 month')));
        $this->native_display('admin/count_access.html');
    }

    public function count_content_data(){
        $start_time = empty($_REQUEST['start']) ? date('Y-m-d',strtotime('-1 month')) : $_REQUEST['start'];
        $end_time = empty($_REQUEST['end']) ? date('Y-m-d H:i:s') : $_REQUEST['end']." 23:59:59";

        $result_article = $this->article_model->GetGroupByDate($start_time,$end_time);
        $result_content = $this->content_model->GetGroupByDate($start_time,$end_time);

        $type_list = array('content','article');
        $article_list = $content_list = array();
        foreach($result_content as &$v){
            if(empty($content_list[$v['time']])) $content_list[$v['time']] = $v['num'];
            else $content_list[$v['time']] += $v['num'];
        }
        foreach($result_article as &$v){
            if(empty($article_list[$v['time']])) $article_list[$v['time']] = $v['num'];
            else $article_list[$v['time']] += $v['num'];
        }

        $days = ceil((strtotime($end_time) - strtotime($start_time))/(24*60*60));
        $key_all = array();
        for($i=0 ; $i<$days ; $i++){
            $key_all[]=date('Y-m-d',strtotime($start_time)+$i*24*60*60);
        }
        rsort($key_all);

        $data = array();
        foreach($key_all as $v){
            $data[$v]['article'] = empty($article_list[$v]) ? 0 : $article_list[$v];
            $data[$v]['content'] = empty($content_list[$v]) ? 0 : $content_list[$v];
        }

        splash('success','',$data);
    }

    public function count_access_data(){
        $start_time = empty($_REQUEST['start']) ? date('Y-m-d',strtotime('-1 month')) : $_REQUEST['start'];
        $end_time = empty($_REQUEST['end']) ? date('Y-m-d H:i:s') : $_REQUEST['end']." 23:59:59";

        $result = $this->access_model->GetGroupByDate($start_time,$end_time);
        $access_list = array();
        foreach($result as $v){
            if(empty($access_list[$v['time']])){
                $access_list[$v['time']]['pv'] = $v['num'];
                $access_list[$v['time']]['uv'] = $v['ip'];
            }else {
                $access_list[$v['time']]['pv'] += $v['num'];
                $access_list[$v['time']]['uv'] += $v['ip'];
            }
        }

        $days = ceil((strtotime($end_time) - strtotime($start_time))/(24*60*60));
        $key_all = array();
        for($i=0 ; $i<$days ; $i++){
            $key_all[]=date('Y-m-d',strtotime($start_time)+$i*24*60*60);
        }
        rsort($key_all);

        $data = array();
        foreach($key_all as $v){
            $data[$v]['uv'] = empty($access_list[$v]['uv']) ? 0 : $access_list[$v]['uv'];
            $data[$v]['pv'] = empty($access_list[$v]['pv']) ? 0 : $access_list[$v]['pv'];
        }
         splash('success','',$data);
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */