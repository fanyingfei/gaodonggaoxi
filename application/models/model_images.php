<?php

class model_images extends CI_Model{

    CONST TABLE_NAME = 'images';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    /*
     * 查找一页的内容
     */
    public function girl_list( $p = 1 ,$limit = 10){
        $sql = 'select * from '.self::TABLE_NAME.'  where status = 1 order by girl_id desc limit '.($p-1)*$limit.', '.$limit;
        return $this->db->query($sql)->result_array();
    }

    /*
    * 得到全部数量
    */
    public function girl_count(){
        $sql = 'select count(*) as num from '.self::TABLE_NAME .' where status = 1';
        return $this->db->query($sql)->first_row('array')['num'];
    }

    /*
     * 查找该用户下的图片,通过status来控制查不同状态的图片
     */
    public function find_user( $user_id , $p = 1 , $status = ''){
        $where = '';
        if($status !== ''){
            $where = ' and status = '.$status;
        }
        $sql = 'select id,img_url,good,bad,msg,created_at from images where user_id = '.$user_id.$where.' order by created_at desc limit '.($p-1)*self::LIMIT.', '.self::LIMIT;
        return $this->db->query($sql)->result_array();
    }

    /*
     * 看是否重复
     */
    public function find_one($sha1){
        $sql = 'select id from images where sha1 = "'.$sha1.'"';
        return $this->db->query($sql)->first_row('array');
    }



    /*
     * 插入和更新图片
     */
    public function save($data){
        if(!empty($data['id'])){
            $updated_at = date("Y-m-d H:i:s",time());
            $data['updated_at'] = $updated_at;
            return $this->db->where('id', $data['id'])->update('images', $data);
        }else{
            $updated_at = date("Y-m-d H:i:s",time());
            $data['updated_at'] = $updated_at;
            $data['created_at'] = $updated_at;
            if($this->db->insert('images', $data)){
                return $this->db->insert_id();
            }
            return false;
        }
    }

    /*
     * 删除图片
     */
    public function del($id){
        $this->db->where('id',$id);
        $this->db->delete('images');
        return true;
    }

}
?>



