<?php

class model_record extends MY_Model{

    private $key = 'rec_id';
    private $table  = 'fyf_record';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }
}
?>



