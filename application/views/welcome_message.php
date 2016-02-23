<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>test</title>

	<style type="text/css">
li{float:left;margin-left: 20px;}
ul{list-style: none;}
.nav-selected-slider-box {
    height: 2px;
    position: relative;
}
.nav-selected-slider-box span{
    background-color: #0068ff;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
}
	</style>
</head>
<body>

<div id="container">
	<div onclick="ajax_page()">click!</div>
    <ul><li>111111</li><li>2222222</li><li class="active">3333</li></ul>
    <div class="nav-selected-slider-box">
        <span id="slider"></span>
    </div>
</div>
<div id="page"></div>


<form enctype="multipart/form-data" method="post" name="upform" action="http://myself/fanfan/upload.php">
    上传文件: <br><br><br>
    <input name="upfile[]" type="file"  style="width:200;border:1 solid #9a9999; font-size:9pt; background-color:#ffffff" size="17">
    <input type="submit" value="上传" style="width:30;border:1 solid #9a9999; font-size:9pt; background-color:#ffffff" size="17"><br><br><br>
    允许上传的文件类型为:jpg|jpeg|png|pjpeg|gif|bmp|x-png|swf <br><br>
    <a href="index.php">返回</a>
</form>




</body>
<script src="/fanfan/resources/js/jquery.js"></script>
<script>
function ajax_page(){
    var spec = [];
    spec.push(48);
    $.ajax({
         　　url: "http://fan.whaley.cn/cart/add",
         　　data:{"quick":1,'spec':JSON.stringify(spec),'goods_id':5,'parent':0},
　　          type: "POST",
         　　dataType:'jsonp',
            jsonp: "jsonpcallback",
            jsonpCallback:"fanfan",
         　　success:function(data){
              //  var json = eval('('+data+')');
                alert(data.msg);

            },
        　　error:function(er){
            　　alert(er.msg);
            }
    });

}
</script>
</html>