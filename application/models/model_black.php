<?php

class model_black extends MY_Model{

    private $key = 'black_id';
    private $table  = 'black';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }
}
?>



