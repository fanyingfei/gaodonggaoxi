<?php

class model_content extends MY_Model{

    private $key = 'con_id';
    private $table  = 'content';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }
}
?>



