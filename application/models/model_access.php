<?php

class model_access extends CI_Model{

    CONST TABLE_NAME = 'access';
    CONST PRI_KEY           = 'rec_id';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
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
     * 插入记录
     */
    public function save($data){
    //    if(!empty($_SESSION['is_admin']) && $_SESSION['is_admin'] == 1) return true;
        $data['ip'] = get_real_ip();
        $data['create_time'] = date('Y-m-d H:i:s');
        return $this->db->insert(self::TABLE_NAME ,$data);
    }

    public function update_ip_address($id,$ip_address){
         $this->db->update(self::TABLE_NAME , array('ip_address'=>$ip_address), array(self::PRI_KEY =>$id));
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



