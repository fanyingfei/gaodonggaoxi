<?php

class model_access extends MY_Model{

    private $key = 'rec_id';
    private $table  = 'access';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }
}
?>



