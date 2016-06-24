<?php

class Reply_model extends MY_Model{

    private $key = 'rep_id';
    private $table  = 'fyf_reply';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }
}
?>



