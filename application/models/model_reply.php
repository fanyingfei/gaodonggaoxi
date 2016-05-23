<?php

class model_reply extends MY_Model{

    private $key = 'rep_id';
    private $table  = 'reply';

    function __construct()
    {
        $this->set($this->key , $this->table);
    }
}
?>



