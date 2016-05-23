<?php

class model_nav extends MY_Model{

    private $key = 'nav_id';
    private $table  = 'nav';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }
}
?>



