<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class content extends MY_Controller  {
    private $type = 1; //默认为1
    private $detail_data = array(4,6); //需要展示详情的
    private $total_type_data = array('xian'=>1 ,'know'=>2 ,'wen'=>3,'zzs'=>4,'meizi'=>5,'myth'=>6);
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

    public function xian($p = 1){
        $this->type = 1;
        $this->assign('body','xian');
        $this->assign('title','闲话');
        $this->assign('info','闲话，段子，笑话，糗事，搞笑，gif图，工作学习之余，来轻松一下吧');
        $this->assign('keywords','闲话,无聊,段子,轻松,内涵段子,神回复,冷笑话,趣事,糗事,成人笑话,GIF图');
        $this->assign('description','闲话');
        $this->index($p);
    }

    public function know($p = 1){
        $this->type = 2;
        $this->assign('body','know');
        $this->assign('title','小知士');
        $this->assign('info','介绍一些生活小常识');
        $this->assign('keywords','小知士');
        $this->assign('description','小知士');
        $this->index($p);
    }

    public function wen($p = 1){
        $this->type = 3;
        $this->assign('body','wen');
        $this->assign('title','美文');
        $this->assign('info','美文');
        $this->assign('keywords','美文');
        $this->assign('description','美文');
        $this->index($p);
    }


    public function zzs($p = 1){
        $this->type = 4;
        $this->assign('body','zzs');
        $this->assign('title','渣渣说');
        $this->assign('info','渣渣说');
        $this->assign('keywords','渣渣说');
        $this->assign('description','渣渣说');
        $this->index($p);
    }

    public function meizi($p = 1){
        $this->type = 5;
        $this->assign('body','meizi');
        $this->assign('title','妹子');
        $this->assign('info','快来养养眼吧，大把大把的妹子');
        $this->assign('keywords','妹子');
        $this->assign('description','妹子');
        $this->index($p);
    }

    public function myth($p = 1){
        $this->type = 6;
        $this->assign('body','myth');
        $this->assign('title','神话');
        $this->assign('info','神话');
        $this->assign('keywords','神话');
        $this->assign('description','神话');
        $this->index($p);
    }

    /*
    * 神话详情
    */
    public function myth_detail($id){
        $detail = $this->get_detail(intval($id));
        $this->assign('data',$detail);
        $this->assign('body','myth');
        $this->assign('title','神话详情');
        $this->assign('info','神话详情');
        $this->assign('keywords','神话详情');
        $this->assign('description','神话详情');
        $this->display('detail.html');
    }

    /*
     * 渣渣说详情
     */
    public function zzs_detail($id){
        $detail = $this->get_detail(intval($id));
        $this->assign('data',$detail);
        $this->assign('body','myth');
        $this->assign('title','渣渣说详情');
        $this->assign('info','渣渣说详情');
        $this->assign('keywords','渣渣说详情');
        $this->assign('description','渣渣说详情');
        $this->display('detail.html');
    }


    public function index($p = 1)
    {
        $limit = 10;
        $p = intval($p);
        $this->load->library('page');
        $where = 'where status = 1 and type = '.$this->type;
        $search = empty($_COOKIE['search']) ? '' : $_COOKIE['search'] ;
        if(!empty($search)) $where .= " and name like '%$search%' ";

        //1是特殊的需要看详情的
        $flag = in_array($this->type,$this->detail_data) ? 1 : 0;

        //得到数据
        $list  = $this->model_content->data_list($p,$limit,$where);
        foreach($list as &$v){
            $v['u_name'] = empty($v['user_id']) ? md5($v['email']) : $v['name'];
            $v['create_time'] = change_time($v['create_time']);
            if($flag == 1){
                $v['content'] = mb_substr(strip_tags($v['content']), 0, 150, 'utf-8').'...';
                $v['title'] = empty($v['title']) ? mb_substr($v['content'], 0, 20, 'utf-8').'...' : $v['title'];
            }else{
                $v['content'] = strip_tags($v['content'],'<br><img><a>');
            //    if($res_content = $this->gif_static($v['content'])) $v['content'] = $res_content;
            }
        }
        //得到总数
        $count = $this->model_content->data_count($where);
        //生成页码
        $page = get_page($count,$limit,$p);

        $this->assign('list',$list);
        $this->assign('count',$count);
        $this->assign('page',$page);
        $this->assign('type',$this->type);
        if($flag == 1){
            $this->display('article.html');
        }else{
            $this->display('content.html');
        }
    }

    public function save(){
        //是否拉入黑名单
        $this->load->model('model_black');
        $this->load->model('model_users');
        $res = $this->model_black->find_one();
        if($res) splash('error','你已被拉入黑名单');

        $content = trim($_REQUEST['content']);
        $data['type'] = intval($_REQUEST['type']);
        //结尾多的<br>去掉 , 保存时要把图片和换行符也保存
        $data['content'] = preg_replace('/(<br\s*?\/?>)+$/i','',strip_tags($content,'<br><img><a>'));
        //验证时只保留图片和链接
        $content = strip_tags($content,'<img><a>');

        if(is_login()){
            //已登陆用户
            $user_info = $this->model_users->get_user_by_user_id($_SESSION['user_id']);
            $data['name'] = $user_info['name'];
            $data['email'] = $user_info['email'];
            if(empty($content)) splash('error','请填写内容');
        }else{
            //已经注册过的昵称不能用
            $res_by_name = $this->model_users->get_user_by_name($data['name']);
            if(!empty($res_by_name)) splash('error','该昵称已被注册，只限登陆后使用');

            $data['name'] = strip_tags(trim($_REQUEST['name']));
            $data['email'] = strip_tags(trim($_REQUEST['email']));
            //除了图片其他全去掉看还有无内容
            valid($data['name'],$data['email'],$content);
        }

        $res  = $this->model_content->save($data);
        if($res){
            splash('success','提交成功，审核后自动发布');
        }else{
            splash('error','提交失败');
        }
    }

    public function reply_list(){
        $con_id = intval($_REQUEST['id']);
        if(empty($con_id)) splash('error','打开失败，请刷新重试');
        $this->load->model('model_reply');
        $res = $this->model_reply->data_list();
        foreach($res as &$v){
            $v['create_time'] = change_time($v['create_time']);
        }
        $data['list'] = empty($res) ? '' : $res;
        splash('success' , '' , $data);
    }

    public function reply_save(){
        if(!is_login()) splash('error','回复请先登陆');
        //是否拉入黑名单
        $this->load->model('model_black');
        $this->load->model('model_users');
        $res = $this->model_black->find_one();
        if($res) splash('error','你已被拉入黑名单');
    }

    /*
     * 点赞
     */
    public function record(){
        $id = intval($_REQUEST['id']);
        $click = $_REQUEST['click'];
        if(!in_array($click,array('good','bad'))) splash('error','Try again');
        $type = intval($_REQUEST['type']);
        if(empty($id) || empty($click)) splash('error','Try again');
        $this->load->model('model_record');
        $res = $this->model_record->is_has($id,$type);
        if(!$res){
            splash('error','You are voted');
        }
        $data = array('type'=>$type,'row_id'=>$id);
        $list  = $this->model_record->save($data);
        $res  = $this->model_content->update($click,$id);
        if($res){
            splash('success','Think you');
        }else{
            splash('error','Try again');
        }
    }


    public function get_detail($id){
        if(empty($id)) parent::error_msg('你要找的内容不见啦！');
        $detail = $this->model_content->detail($id);
        if(empty($detail)) parent::error_msg('你要找的内容不见啦！');
        $detail['content'] = strip_tags($detail['content'],'<img><p><br><a>');
        $detail['title'] = empty($detail['title']) ? mb_substr(strip_tags($detail['content']), 0, 20, 'utf-8').'...' : $detail['title'];
        return $detail;
    }

    public function gif_static($content){
        $img_preg = "/<img (.*?) src=\"(.+?)\".*?>/";
        if(!preg_match($img_preg , $content , $img_data)) return false;

        $original = $new_url = array();
        foreach($img_data as $key=>$v){
            $separate = explode('/' , $v);
            if($key == 2 && strpos($v,'http://ww1.sinaimg.cn') !== false && strpos(end($separate),'.gif')){
                $original[] = ' src="'.$v;
                $new_url[] = ' src="http://ww1.sinaimg.cn/small/'.end($separate);
            }
        }

        if(!empty($original)){
            return str_replace($original , $new_url , $content);
        }else{
            return false;
        }
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */