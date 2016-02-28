<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/
$route['default_controller'] = "main/content/xian";
$route['404_override'] = '';
//闲话
$route['xian'] = "main/content/xian";
$route['xian/(:num)'] = "main/content/xian/$1";
//小知识
$route['know'] = "main/content/know";
$route['know/(:num)'] = "main/content/know/$1";
//美文
$route['wen'] = "main/content/wen";
$route['wen/(:num)'] = "main/content/wen/$1";
//妹子
$route['meizi'] = "main/content/meizi";
$route['meizi/(:num)'] = "main/content/meizi/$1";
//神话
$route['myth'] = "main/article/myth";
$route['myth/(:num)'] = "main/article/index/$1";
//详情
$route['myth/detail'] = "main/article/detail";
$route['myth/detail/(:num)'] = "main/article/detail/$1";
//渣渣说
$route['zzs'] = "main/article/zzs";
$route['zzs/detail'] = "main/article/detail";
$route['zzs/(:num)'] = "main/article/zzs/$1";
$route['zzs/detail/(:num)'] = "main/article/zzs/$1";
//点赞，保存
$route['content/comment'] = "main/content/comment";
$route['content/save'] = "main/content/save";
$route['article/save'] = "main/article/save";
//登录
$route['login'] = "main/user/login_index";
$route['login/login_in'] = "main/user/login_in";
$route['login/login_out'] = "main/user/login_out";
//注册
$route['register'] = "main/user/register";
$route['register/save'] = "main/user/register_save";
//用户中心
$route['user/info'] = "main/user/user_info";

$route['admin'] = "admin/admin/index";
$route['api/([a-z0-9]+)/(\d+)'] = "api/$1/index/$2";
/* End of file routes.php */
/* Location: ./application/config/routes.php */