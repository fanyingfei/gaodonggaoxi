<?php

class Model_access extends MY_Model{

    private $key = 'rec_id';
    private $table  = 'fyf_access';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }
}
?>



