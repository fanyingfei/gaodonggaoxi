<?php

class Permission_model extends MY_Model{

    private $key = 'per_id';
    private $table  = 'fyf_permission';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }
}
?>



