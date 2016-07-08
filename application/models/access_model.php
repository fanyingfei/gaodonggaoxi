<?php

class Access_model extends MY_Model{

    private $key = 'rec_id';
    private $table  = 'fyf_access';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }

    public function GetGroupByDate($start_time,$end_time){
        $sql = "select count(".$this->key.") as num , count(distinct ip) as ip , DATE_FORMAT(create_time,'%Y-%m-%d') as time  from " . $this->table.
            " where create_time >= '$start_time' and create_time <= '$end_time' group by time";
        return $this->db->query($sql)->result_array();
    }
}
?>



