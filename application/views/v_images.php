

        <?php if($data){ ?>
            <?php foreach($data as $key=>$v){ ?>
            <div ><img src="<?php echo $v['imgurl'] ?>" /> <p class="del" >删除</p></div>
            <?php } ?>
        <?php } ?>

<script src="/fanfan/resources/js/jquery.js"></script>
<script>


    function del(id){
        $.ajax({
            type:'POST',
            data:{"id":id},
            url:"../del",
            dataType:'text',
            success:function(data){
                $(".image_"+id).remove();
            },
            error:function (){
                alert("失败！");
            }
        })
    }
</script>