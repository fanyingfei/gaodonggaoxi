<?php

class model_nav extends MY_Model{

    private $key = 'nav_id';
    private $table  = 'fyf_nav';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }
}
?>



