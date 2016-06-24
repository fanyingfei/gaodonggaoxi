<?php

class Users_model extends MY_Model{

    private $key = 'user_id';
    private $table  = 'fyf_users';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }
}
?>



