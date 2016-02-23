<?php

class model_content extends CI_Model{

    CONST TABLE_NAME = 'content';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    /*
     * 查找一页的内容
     */
    public function data_list( $p = 1 ,$limit = 10 ,$type = 1){
        $sql = 'select * from '.self::TABLE_NAME."  where status = 1 and type = $type order by con_id desc limit ".($p-1)*$limit.', '.$limit;
        return $this->db->query($sql)->result_array();
    }

    /*
    * 得到全部数量
    */
    public function data_count($type = 1){
        $sql = 'select count(con_id) as num from '.self::TABLE_NAME .' where status = 1 and type = '.$type;
        return $this->db->query($sql)->first_row('array')['num'];
    }

    /*
     * 插入笑话
     */
    public function save($data){
        $data['create_time'] = date('Y-m-d H:i:s');
        return $this->db->insert(self::TABLE_NAME ,$data);
    }

    /*
     * good
     */
    public function update($click , $id){
        $sql = 'update '.self::TABLE_NAME ." set $click = $click + 1 where con_id = $id ";
        return $this->db->query($sql);
    }

    /*
     * 删除
     */
    public function del($id){
        $this->db->where('con_id',$id);
        $this->db->delete(self::TABLE_NAME);
        return true;
    }
}
?>



