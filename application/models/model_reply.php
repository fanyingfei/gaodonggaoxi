<?php

class model_reply extends CI_Model{

    CONST TABLE_NAME = 'reply';
    CONST PRI_KEY           = 'rep_id';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    /*
    * 通过ID查找回复列表
    */
    public function data_list( $con_id = '' ,$order_by = ''){
        if(empty($con_id)) return array();
        if(empty($order_by)) $order_by = ' order by '.self::PRI_KEY. ' desc';
        $sql = 'select * from '.self::TABLE_NAME." where con_id = $con_id $order_by ";
        return $this->db->query($sql)->result_array();
    }

    /*
     * 列表
     */
    public function admin_list( $p = 1 ,$limit = 10  , $where = '' ,$order_by = ''){
        if(empty($order_by)) $order_by = ' order by '.self::PRI_KEY. ' desc';
        $sql = 'select * from '.self::TABLE_NAME." $where $order_by limit ".($p-1)*$limit.', '.$limit;
        return $this->db->query($sql)->result_array();
    }

    /*
    * 得到全部数量
    */
    public function data_count($where = ''){
        $sql = 'select count(*) as num from '.self::TABLE_NAME ." $where";
        return $this->db->query($sql)->first_row('array')['num'];
    }

    /*
     * 点oo或者xx
     */
    public function update($click , $id){
        $sql = 'update '.self::TABLE_NAME ." set $click = $click + 1 where ".self::PRI_KEY ." = $id ";
        return $this->db->query($sql);
    }

    /*
    * 保存用户提交内容
    */
    public function save($data){
        $data['create_time'] = date('Y-m-d H:i:s');
        $data['ip'] = get_real_ip();
        $data['user_id'] = empty($_SESSION['user_id']) ? 0 : $_SESSION['user_id'];
        $data['name'] = empty($_SESSION['name']) ? '' : $_SESSION['name'];
        return $this->db->insert(self::TABLE_NAME ,$data);
    }

    /*
     * 删除
     */
    public function delete($ids){
        $this->db->where_in(self::PRI_KEY ,$ids);
        return $this->db->delete(self::TABLE_NAME);
    }
}
?>



