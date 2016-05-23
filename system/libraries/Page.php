<?php

/**
 * 分页
*/

class CI_Page {
    /**页码**/
    public $pageNo = 1;
    /**页大小**/
    public $pageSize = 20;
    /**共多少页**/
    public $pageCount = 0;
    /**总记录数**/
    public $totalNum = 0;
    /**偏移量,当前页起始行**/
    public $offSet = 0;
    /**是否有上一页**/
    public $hasPrePage = true;
    /**是否有下一页**/
    public $hasNextPage = true;

    public $pageNoList = array();

    public $jsFunction ='jsFunction';


    /**
     *
     * @param unknown_type $count 总行数
     * @param unknown_type $size 分页大小
     * @param unknown_type $string
     */
    public function __construct($count=0, $size=20,$pageNo=1,$jsFunction='href'){

        $this->totalNum = $count;//总记录数
        $this->pageSize = $size;//每页大小
        $this->pageNo = $pageNo;
        //计算总页数
        $this->pageCount = ceil($this->totalNum/$this->pageSize);
        $this->pageCount = ($this->pageCount<=0)?1:$this->pageCount;
        //检查pageNo
        $this->pageNo = $this->pageNo == 0 ? 1 : $this->pageNo;
        $this->pageNo = $this->pageNo > $this->pageCount? $this->pageCount : $this->pageNo;

        //计算偏移
        $this->offset = ( $this->pageNo - 1 ) * $this->pageSize;
        //计算是否有上一页下一页
        $this->hasPrePage = $this->pageNo == 1 ?false:true;

        $this->hasNextPage = $this->pageNo >= $this->pageCount ?false:true;

        $this->jsFunction = $jsFunction;

    }
    /**
     * 分页算法
     * @return
     */
    private function generatePageList(){
        $pageList = array();
        if($this->pageCount <= 4){
            for($i=0;$i<$this->pageCount;$i++){
                array_push($pageList,$i+1);
            }
        }else{
            if($this->pageNo <= 2){
                for($i=0;$i<3;$i++){
                    array_push($pageList,$i+1);
                }
             //   array_push($pageList,-1);
             //  array_push($pageList,$this->pageCount);
            }else if($this->pageNo > 2 && $this->pageNo <= $this->pageCount - 2){
                array_push($pageList,1);
                array_push($pageList,-1);

                array_push($pageList,$this->pageNo -1);
                array_push($pageList,$this->pageNo);
                array_push($pageList,$this->pageNo + 1);

            //    array_push($pageList,-1);
            //    array_push($pageList,$this->pageCount);
            }else if($this->pageNo > $this->pageCount - 2){
                array_push($pageList,1);

                array_push($pageList,-1);
                for($i=3;$i>0;$i--){
                    array_push($pageList,$this->pageCount - $i+1);
                }
            }
        }
        return $pageList;
    }

    /***
     * 创建分页控件倒序
     * @param
     * @return String
     */
    public function echoPageAsDiv(){
        $pageList = $this->generatePageList();

        $pageString ="<div class='page-bottom'>";

        if(!empty($pageList)){
            if($this->pageCount >1){
                if($this->jsFunction != 'href'){
                    if($this->hasPrePage){
                        $pageString = $pageString ."<a class='page-next' onclick='" .$this->jsFunction . "(" . ($this->pageCount-$this->pageNo + 2) . ")'>«</a>";
                    }
                    foreach ($pageList as $k=>$p){
                        if($this->pageNo == $p){
                            $pageString = $pageString ."<span class='page-cur'>[" . ($this->pageCount-$this->pageNo + 1) . "]</span>";
                            continue;
                        }
                        if($p == -1){
                            $pageString = $pageString ."<span class='page-break page-desc'>...</span>";
                            continue;
                        }
                        $pageString = $pageString ."<a onclick='" .$this->jsFunction . "(" . ($this->pageCount-$p + 1) . ")'>" . ($this->pageCount-$p + 1) . "</a>";
                    }

                    if($this->hasNextPage){
                        $pageString = $pageString ."<a class='page-next' onclick='" .$this->jsFunction . "(" . ($this->pageCount-$this->pageNo ) . ")'>»</a>";
                    }
                }else{
                    $url = get_page_url();
                    if($this->hasPrePage){
                        $pageString = $pageString ."<a class='page-next' href='" .$url . ($this->pageCount-$this->pageNo + 2) . "'>«</a>";
                    }
                    foreach ($pageList as $k=>$p){
                        if($this->pageNo == $p){
                            $pageString = $pageString ."<span class='page-cur'>[" . ($this->pageCount-$this->pageNo + 1) . "]</span>";
                            continue;
                        }
                        if($p == -1){
                            $pageString = $pageString ."<span class='page-break  page-desc'>...</span>";
                            continue;
                        }
                        $pageString = $pageString ."<a href='" .$url  . ($this->pageCount-$p + 1) . "'>" . ($this->pageCount-$p + 1) . "</a>";
                    }

                    if($this->hasNextPage){
                        $pageString = $pageString ."<a class='page-next' href='" .$url . ($this->pageCount-$this->pageNo ) . "'>»</a>";
                    }
                }

            }
        }
        $pageString = $pageString .("</div>");
        return $pageString;
    }

    /*
     *创建页码正序
     */
    public function echoPageAsDiv_asc(){
        $pageList = $this->generatePageList();

        $pageString ="<div class='page-bottom'>";

        if(!empty($pageList)){
            if($this->pageCount >1){
                if($this->jsFunction != 'href'){
                    if($this->hasPrePage){
                        $pageString = $pageString ."<a class='page-next' onclick='" .$this->jsFunction . "(" . ($this->pageNo-1) . ")'>«</a>";
                    }
                    foreach ($pageList as $k=>$p){
                        if($this->pageNo == $p){
                            $pageString = $pageString ."<span class='page-cur'>" . $this->pageNo . "</span>";
                            continue;
                        }
                        if($p == -1){
                            $pageString = $pageString ."<span class='page-break'>...</span>";
                            continue;
                        }
                        $pageString = $pageString ."<a onclick='" .$this->jsFunction . "(" . $p . ")'>" . $p . "</a>";
                    }

                    if($this->hasNextPage){
                        $pageString = $pageString ."<a class='page-next' onclick='" .$this->jsFunction . "(" . ($this->pageNo+1) . ")'>»</a>";
                    }
                }else{
                    $total_url = explode('/',$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
                    $url = empty($total_url[1]) ? '/gx/' : '/'.$total_url[1].'/';
                    if($this->hasPrePage){
                        $pageString = $pageString ."<a class='page-next' href='" .$url . ($this->pageNo-1) . "'>«</a>";
                    }
                    foreach ($pageList as $k=>$p){
                        if($this->pageNo == $p){
                            $pageString = $pageString ."<span class='page-cur'>" . $this->pageNo . "</span>";
                            continue;
                        }
                        if($p == -1){
                            $pageString = $pageString ."<span class='page-break'>...</span>";
                            continue;
                        }
                        $pageString = $pageString ."<a href='" .$url  . $p . "'>" . $p . "</a>";
                    }

                    if($this->hasNextPage){
                        $pageString = $pageString ."<a class='page-next' href='" .$url . ($this->pageNo+1) . "'>»</a>";
                    }
                }

            }
        }
        $pageString = $pageString .("</div>");
        return $pageString;
    }
}

?>