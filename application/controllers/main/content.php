<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class content extends MY_Controller  {
    private $type = 1; //默认为1
    const table_name = 'content';
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
        $this->load->model('model_content');
    }

    public function index($p = 0){
        $this->xiao($p);
    }

    public function xiao($p = 0){
        $this->set_type_value(__FUNCTION__);
        $this->assign('body','body-content');
        $this->assign('title','搞东搞西－搞搞东西');
        $this->assign('keywords','闲话,无聊,段子,轻松,内涵段子,神回复,冷笑话,趣事,糗事,成人笑话,GIF图');
        $this->assign('description','搞东搞西搞笑专区，快乐每一天，爆笑笑不停');
        $this->content_list($p);
    }

    public function hua($p = 0){
        $this->set_type_value(__FUNCTION__);
        $this->assign('body','body-content');
        $this->assign('title','那些话－搞东搞西');
        $this->assign('keywords','那些话,语录,美文,经典,短文,鸡汤,句子');
        $this->assign('description','总有一句话会让你感动莫名，泪流满面');
        $this->content_list($p);
    }

    public function meizi($p = 0){
        $this->set_type_value(__FUNCTION__);
        $this->assign('body','body-content');
        $this->assign('title','妹子－搞东搞西');
        $this->assign('keywords','妹子,美女,美女图片,软妹子,清纯美女,性感美女');
        $this->assign('description','清纯甜美、性感火辣、温柔可爱的软妹子都在这捏，走过路过不要错过哦。');
        $this->content_list($p);
    }

    /*
     * 列表
     */
    public function content_list($p = 0)
    {
        $limit = 10;
        $p = intval($p);
        $this->load->library('page');
        $where = 'where status = 1 and type = '.$this->type;
        $search = empty($_COOKIE['search']) ? '' : $_COOKIE['search'] ;
        if(!empty($search)) $where .= " and name like '%$search%' ";

        //得到总数
        $count = $this->model_content->data_count($where);
        $total_page = ceil($count/$limit);
        if(empty($p) || $p > $total_page) $p = $total_page;

        //得到数据
        $list  = $this->model_content->data_list($total_page - $p,$limit,$where);
        //得到头像
        $user_res =  parent :: get_user_avatar($list);
        if(!empty($user_res)){
            $user_avatar = my_array_column($user_res , 'avatar' , 'user_id');
            $user_time = my_array_column($user_res , 'create_time' , 'user_id');
        }

        foreach($list as &$v){
            $v['user_sn'] = $v['avatar'] = '';
            $v['create_time'] = change_time($v['create_time']);
            $v['u_name'] = empty($v['user_id']) ? md5($v['email']) : $v['name'];
            if(!empty($v['user_id'])){
                $v['avatar'] = empty($user_avatar[$v['user_id']]) ? '' : $user_avatar[$v['user_id']];
                $time = empty($user_time[$v['user_id']]) ? '' : $user_time[$v['user_id']];
                $v['user_sn'] = get_user_sn($v['user_id'] , $time);
            }
             //gif图转成静态，145条后在保存时就已经转化过了
            if($v['con_id'] < 145){
                if($res_content = gif_static_gif($v['content'])) $v['content'] = $res_content;
                $v['content'] = filter_content_br($v['content']);
            }
        }

        //生成页码
        $page = get_page($count,$limit,$total_page - $p + 1);

        $this->assign('list',$list);
        $this->assign('count',$count);
        $this->assign('page',$page);
        $this->assign('type',$this->type);

        $this->display('content.html');
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

        $data['type'] = intval($_REQUEST['type']);
        $data['content'] = $this->deal_content($_REQUEST['content']);

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

        $res  = $this->model_content->save($data);
        if($res){
            splash('success','提交成功，审核后自动发布');
        }else{
            splash('error','提交失败');
        }
    }

    /*
     * 主要内容点赞
     */
    public function content_record(){
        parent :: record(self::table_name);
    }

    /*
     * 保存时处理内容
     */
    public function deal_content($content){
        $content = str_replace('</p>','</p><br>',$content);//把以P标签的换行转化成以<br>的换行
        $valid_content = trim(strip_tags($content,'<img>'));
        if(empty($valid_content)) splash('error','请填写内容');
        $content = filter_content_br(strip_tags($content,'<img><a><br>'));
        if($res_content = gif_static_gif($content)) $content = $res_content;
        return $content;
    }


    public function error(){
        parent :: error_msg();
    }

    public function set_type_value($fun){
        $this->type = parent :: $all_type_data[$fun];
        $this->assign('menu',parent :: $all_type_name[$this->type]);
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */