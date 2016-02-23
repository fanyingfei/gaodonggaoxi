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
    public function del($id){
        $this->db->where(self::PRI_KEY ,$id);
        $this->db->delete(self::TABLE_NAME);
        return true;
    }
}
?>



