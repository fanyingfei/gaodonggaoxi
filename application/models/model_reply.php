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
    * 查找反有回复
    */
    public function data_list( $con_id = '' ,$order_by = ''){
        if(empty($con_id)) return array();
        if(empty($order_by)) $order_by = ' order by '.self::PRI_KEY. ' desc';
        $sql = 'select * from '.self::TABLE_NAME." where con_id = $con_id $order_by ";
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
     * 删除
     */
    public function delete($ids){
        $this->db->where_in(self::PRI_KEY ,$ids);
        return $this->db->delete(self::TABLE_NAME);
    }
}
?>



