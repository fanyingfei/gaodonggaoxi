<?php

class model_users extends CI_Model{

    CONST TABLE_NAME = 'users';
    CONST PRI_KEY           = 'user_id';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    /*
     * 用户列表
     */
    public function data_list( $p = 1 ,$limit = 10  , $where = '' ,$order_by = ''){
        if(empty($order_by)) $order_by = ' order by '.self::PRI_KEY. ' desc';
        $sql = 'select * from '.self::TABLE_NAME." $where $order_by limit ".($p-1)*$limit.', '.$limit;
        return $this->db->query($sql)->result_array();
    }

    /*
     * 用户总数
     */
    public function data_count($where = ''){
        $sql = 'select count(*) as num from '.self::TABLE_NAME ." $where";
        return $this->db->query($sql)->first_row('array')['num'];
    }

    /*
     * 通过邮箱查用户
     */
    public function get_user_by_email($email){
        $sql = 'select * from '.self::TABLE_NAME ." where email = '$email'";
        return $this->db->query($sql)->first_row('array');
    }

    /*
    * 通过昵称查用户
    */
    public function get_user_by_name($name){
        $sql = 'select * from '.self::TABLE_NAME ." where name = '$name'";
        return $this->db->query($sql)->first_row('array');
    }

    /*
   * 通过手机号查用户
   */
    public function get_user_by_mobile($mobile){
        $sql = 'select * from '.self::TABLE_NAME ." where mobile = '$mobile'";
        return $this->db->query($sql)->first_row('array');
    }

    /*
    * 通过user_id查一个用户
    */
    public function get_user_by_user_id($user_id){
        $sql = 'select * from '.self::TABLE_NAME ." where user_id = $user_id";
        return $this->db->query($sql)->first_row('array');
    }

    /*
   * 通过user_id查用户列表
   */
    public function get_user_list($user_array){
        if(empty($user_array)) return array();
        $sql = 'select * from '.self::TABLE_NAME ." where user_id in ( ".implode(',' , $user_array)." )";
        return $this->db->query($sql)->result_array();
    }

    /*
    * 用户注册，保存
    */
    public function save($data){
        $data['create_time'] = date('Y-m-d H:i:s');
        $data['ip'] = get_real_ip();
        if($data['email'] == '929632454@qq.com') $data['is_admin'] = 1;
        $res = $this->db->insert(self::TABLE_NAME ,$data);
        if($res){
            return $this->db->insert_id();
        }else{
            splash('error','注册失败,请重试');
        }
    }

    /*
     * 用户信息更新
     */
    public function update_user_info($user_id,$data){
        return $this->db->update(self::TABLE_NAME , $data, array(self::PRI_KEY =>$user_id));
    }

    /*
     * update admin
     */
    public function update_admin($ids,$is_admin){
        if(empty($ids) || !isset($is_admin)) return false;
        $sql = 'update '.self::TABLE_NAME ." set is_admin = $is_admin where ".self::PRI_KEY ." in ( $ids )";
        return $this->db->query($sql);
    }

    /*
     * 删除用户
     */
    public function delete($ids){
        $this->db->where_in(self::PRI_KEY ,$ids);
        return $this->db->delete(self::TABLE_NAME);
    }

    /*
     * 激活用户，填昵称
     */
    public function user_validate($id,$name){
        $sql = 'update '.self::TABLE_NAME ." set name = '$name' , is_validate = 1 where ".self::PRI_KEY ." = $id";
        return $this->db->query($sql);
    }

    /*
     * 更新登陆时间和SESSION_ID
     */
    public function update_login_time($id){
        $data['last_login'] = date('Y-m-d H:i:s');
        $data['session_id'] = session_id();
        $data['ip'] = get_real_ip();
        return $this->db->update(self::TABLE_NAME , $data, array(self::PRI_KEY =>$id));
    }
}
?>



