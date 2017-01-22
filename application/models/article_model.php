<?php

class Article_model extends MY_Model{

    private $key = 'con_id';
    private $table  = 'fyf_article';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }

    /*
     * 列表
     */
    public function GetAll($where = '' , $sort='' , $p=0 , $limit = 0){
        $limit = empty($limit) ? '' : 'limit '.($p * $limit)." , $limit ";
        $sort = empty($sort) ? 'order by '.$this->key.' desc'  : 'order by '.$sort;

        $sql = 'select con_id,user_id,title,good,bad,scan,email,`name`,`type`,reply,tags,create_time,status,ip from ' .
            $this->table. " $where $sort $limit ";
        return $this->db->query($sql)->result_array();
    }

    public function GetTopTen(){
        $sql = 'select con_id,title,scan,create_time from ' .$this->table. ' where type in (4,6) order by scan desc limit 10';
        return $this->db->query($sql)->result_array();
    }

    public function GetGroupByDate($start_time,$end_time){
        $sql = "select count(".$this->key.") as num , DATE_FORMAT(create_time,'%Y-%m-%d') as time from " . $this->table.
            " where create_time >= '$start_time' and create_time <= '$end_time' group by time";
        return $this->db->query($sql)->result_array();
    }

}
?>



