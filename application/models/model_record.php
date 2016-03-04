<?php

class model_record extends CI_Model{

    CONST TABLE_NAME = 'record';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    /*
     * 判断是否存在
     */
    public function is_has($id,$type){
        if(!empty($_SESSION['is_admin']) && $_SESSION['is_admin'] == 1) return true;
        $ip = get_real_ip();
        $sql = 'select rec_id from '.self::TABLE_NAME." where ip = '$ip' and type = $type and row_id = $id";
        $res = $this->db->query($sql)->first_row('array');
        return empty($res) ? true : false;
    }

    /*
     * 插入记录
     */
    public function save($data){
        if(!empty($_SESSION['is_admin']) && $_SESSION['is_admin'] == 1) return true;
        $data['ip'] = get_real_ip();
        $data['create_time'] = date('Y-m-d H:i:s');
        return $this->db->insert(self::TABLE_NAME ,$data);
    }
}
?>



