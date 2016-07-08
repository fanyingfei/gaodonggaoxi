<?php

class Content_model extends MY_Model{

    private $key = 'con_id';
    private $table  = 'fyf_content';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }

    public function GetGroupByDate($start_time,$end_time){
        $sql = "select count(".$this->key.") as num , DATE_FORMAT(create_time,'%Y-%m-%d') as time from " . $this->table.
            " where create_time >= '$start_time' and create_time <= '$end_time' group by time";
        return $this->db->query($sql)->result_array();
    }
}
?>



