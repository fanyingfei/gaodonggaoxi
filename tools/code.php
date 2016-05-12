<?php
session_start();
//随机生成的字符串
$_SESSION["code"] = $str=random(4);
$width = 60; //验证码图片的宽度
$height = 35; //验证码图片的高度
@header("Content-Type:image/png");
//echo $str;
$im=imagecreate($width,$height);
//背景色
$back=imagecolorallocate($im,222,222,222);
//模糊点颜色
$pix=imagecolorallocate($im,111,111,111);
//字体色
$font_color =imagecolorallocate($im,0,0,0);
//绘模糊作用的点

for($i=0;$i<100;$i++)
{
    imagesetpixel($im,mt_rand(0,$width),mt_rand(0,$height),$pix);
}

/*本函数在图片上绘出水平的横式字符串。
参数 font 为字形，设为 1 到 5 表示使用默认字形。
参数 x、y 为字符串起点坐标。字符串的内容放在参数 s 上。
参数 col 表示字符串的颜色*/
imagestring($im, 4, 14, 10,$str, $font_color);
//本函数可在图片上绘出长方形。参数 x1、y1 及 x2、y2 分别为矩形对角线的坐标。参数 col 表示矩形边框的颜色
imagerectangle($im,0,0,$width-1,$height-1,$back);
imagepng($im);
imagedestroy($im);

function random($length = 4) {
    $hash = '';
    $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    $max = strlen($chars) - 1;
    PHP_VERSION < '4.2.0' && mt_srand((double)microtime() * 1000000);
    for($i = 0; $i < $length; $i++) {
        $hash .= $chars[mt_rand(0, $max)];
    }
    return $hash;
}