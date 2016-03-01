<?php

class model_black extends CI_Model{

    CONST TABLE_NAME = 'black_ip';
    CONST PRI_KEY           = 'black_id';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    /*
    * 查找一页的内容
    */
    public function data_list( $p = 1 ,$limit = 10  , $where = '' ,$order_by = ''){
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
     * 查找某个ip
     */
    public function find_one(){
        $ip = get_real_ip();
        $sql = 'select black_id from '.self::TABLE_NAME."  where ip = '$ip'";
        return $this->db->query($sql)->first_row('array');
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



