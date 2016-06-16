<?php

class MY_Model extends CI_Model{

    private $key = '';
    private $table  = '';

    function __construct()
    {
        $this->load->database();
    }

    public function set($k,$t){
        $this->key = $k;
        $this->table = $t;
    }

    /*
     * 得到全部数据
     */
    public function GetAll($where = '' , $sort='' , $p=0 , $limit = 0){
        $limit = empty($limit) ? '' : 'limit '.($p * $limit)." , $limit ";
        $sort = empty($sort) ? 'order by '.$this->key.' desc'  : 'order by '.$sort;

        $sql = 'select t2.* from (select '.$this->key.' from ' . $this->table. " $where $sort $limit ) t1 , ".
                    $this->table.' t2  where t1.'.$this->key.' = t2.'.$this->key;
        return $this->db->query($sql)->result_array();
    }


    /*
     * 得到总数
     */
    public function GetTotal($where = ''){
        $sql = 'select count('.$this->key.') as total from ' .$this->table ." $where";
        return $this->db->query($sql)->first_row('array')['total'];
    }

    /*
     * 得到单条记录
     */
    public function GetRow($where = '' , $col = '*'){
        $sql = "select $col from " .$this->table ." $where";
        return $this->db->query($sql)->first_row('array');
    }

    /*
     * 得到单条记录
     */
    public function GetRowByKey($val = ''){
        $sql = 'select * from ' .$this->table ." where ".$this->key. " = $val";
        return $this->db->query($sql)->first_row('array');
    }

    /*
     * 分类 groupby
     */
    public function GetCountGroupBy($where , $col){
        $sql = "select $col , count(* ) as num from ".$this->table ." $where group by $col";
        return $this->db->query($sql)->result_array();
    }

    /*
     * 保存用户提交内容
     */
    public function Save($data){
        $res = $this->db->insert($this->table ,$data);
        if($res){
            return $this->db->insert_id();
        }else{
            return false;
        }
    }

    /*
     * 更新
     */
    public function Update($where , $data){
        return $this->db->update($this->table , $data , $where);
    }

    /*
   * 通过key更新
   */
    public function UpdateByKey($val , $data){
        return $this->db->update($this->table , $data , array($this->key=>$val));
    }

    /*
     * sql更新
     */
    public function UpdateBySql($where , $col , $val){
        if(empty($where) || empty($col)) return false;
        return $this->db->query('update '.$this->table ." set $col = $val $where ");
    }


    /*
     * 自增更新
     */
    public function UpdateNum($id , $col , $num = '+1'){
        $sql = 'update '.$this->table ." set $col = $col $num where ".$this->key ." = $id ";
        return $this->db->query($sql);
    }

    /*
    * 删除
    */
    public function Delete($val , $col = ''){
        $col = empty($col) ? $this->key : $col;
        if(is_array($val)){
            $this->db->where_in($col ,$val);
        }else{
            $this->db->where($col,$val);
        }
        return $this->db->delete($this->table);
    }

}
?>



