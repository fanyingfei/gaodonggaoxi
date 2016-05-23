<?php

class model_article extends MY_Model{

    private $key = 'con_id';
    private $table  = 'article';

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

}
?>



