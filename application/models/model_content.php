<?php

class Model_content extends MY_Model{

    private $key = 'con_id';
    private $table  = 'fyf_content';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }
}
?>



