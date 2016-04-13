<?php

class model_article extends CI_Model{

    CONST TABLE_NAME = 'article';
    CONST PRI_KEY           = 'art_id';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    /*
     * 列表
     */
    public function data_list( $p = 1 ,$limit = 10  , $where = '' ,$order_by = ''){
        if(empty($order_by)) $order_by = ' order by '.self::PRI_KEY. ' desc';
        $sql = "select art_id,user_id,title,good,bad,scan,email,`name`,`type`,reply,tags,create_time,status,ip from "
                    .self::TABLE_NAME ." $where $order_by limit ".$p*$limit.', '.$limit;
        return $this->db->query($sql)->result_array();
    }

    /*
    * 随机
    */
    public function data_random_list($random,$limit,$where){
        $sql = 'select * from '.self::TABLE_NAME." $where  and ".self::PRI_KEY." in (".implode(',',$random).") limit ".$limit;
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
  * 得到全部主键
  */
    public function data_key($where = ''){
        $sql = 'select '.self::PRI_KEY.' as id from '.self::TABLE_NAME ." $where limit 100000";
        return $this->db->query($sql)->result_array();
    }

    /*
     * 得到分类数量
     */
    public function group_count_by_type($where){
        $sql = 'select type , count(* ) as num from '.self::TABLE_NAME ." $where group by type";
        return $this->db->query($sql)->result_array();
    }

    /*
  * 得到单条记录
  */
    public function detail($id = 1){
        $where = ' status = 1 and ';
        if(!empty($_SESSION['is_admin'])) $where = '';
        $sql = 'select * from '.self::TABLE_NAME ." where $where ".self::PRI_KEY.' = '.$id;
        return $this->db->query($sql)->first_row('array');
    }

    /*
     * 保存用户提交内容
     */
    public function save($data){
        $data['create_time'] = date('Y-m-d H:i:s');
        $data['ip'] = get_real_ip();
		if(!empty($_SESSION['is_admin'])) $data['status'] = 1;
        return $this->db->insert(self::TABLE_NAME ,$data);
    }

    /*
     * 点oo或者xx
     */
    public function update($click , $id){
        $sql = 'update '.self::TABLE_NAME ." set $click = $click + 1 where ".self::PRI_KEY ." = $id ";
        return $this->db->query($sql);
    }

    /*
     * 更新状态
     */
    public function update_status($ids,$status){
        if(empty($ids) || !isset($status)) return false;
        $sql = 'update '.self::TABLE_NAME ." set status = $status where ".self::PRI_KEY ." in ( $ids )";
        return $this->db->query($sql);
    }

    /*
    * 更新状态
    */
    public function update_scan($id){
        if(empty($id)) return false;
        $sql = 'update '.self::TABLE_NAME ." set scan = scan + 1 where ".self::PRI_KEY ." = $id";
        return $this->db->query($sql);
    }

    /*
     * 更新回复数
     */
    public function update_reply($id , $num = '+1'){
        if(empty($id)) return false;
        $sql = 'update '.self::TABLE_NAME ." set reply = reply $num where ".self::PRI_KEY ." = $id";
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



