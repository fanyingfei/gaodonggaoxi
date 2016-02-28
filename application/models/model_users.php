<?php

class model_users extends CI_Model{

    CONST TABLE_NAME = 'users';
    CONST PRI_KEY           = 'user_id';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function get_user_by_email($email){
        $sql = 'select * from '.self::TABLE_NAME ." where email = '$email'";
        return $this->db->query($sql)->first_row('array');
    }

    public function get_user_by_user_id($user_id){
        $sql = 'select * from '.self::TABLE_NAME ." where user_id = $user_id";
        return $this->db->query($sql)->first_row('array');
    }

    /*
    * 保存
    */
    public function save($data){
        $data['create_time'] = date('Y-m-d H:i:s');
        return $this->db->insert(self::TABLE_NAME ,$data);
    }

    public function del($id){
        $this->db->where(self::PRI_KEY,$id);
        $this->db->delete(self::TABLE_NAME);
        return true;
    }
}
?>



