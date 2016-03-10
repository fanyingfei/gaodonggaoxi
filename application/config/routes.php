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

//搞笑
$route['gx'] = "main/content/xian";
$route['gx/(:num)'] = "main/content/xian/$1";
//语录
$route['yl'] = "main/content/know";
$route['yl/(:num)'] = "main/content/know/$1";
//妹子
$route['meizi'] = "main/content/meizi";
$route['meizi/(:num)'] = "main/content/meizi/$1";
//神话
$route['myth'] = "main/content/myth";
$route['myth/(:num)'] = "main/content/myth/$1";
$route['myth/detail'] = "main/content/myth";
$route['myth/detail/(:num)'] = "main/content/myth_detail/$1";
//渣渣说
$route['zzs'] = "main/content/zzs";
$route['zzs/detail'] = "main/content/zzs";
$route['zzs/(:num)'] = "main/content/zzs/$1";
$route['zzs/detail/(:num)'] = "main/content/zzs_detail/$1";
//回复列表，回复
$route['reply'] = "main/reply/reply_list";
$route['reply/save'] = "main/reply/reply_save";
//保存
$route['content/save'] = "main/content/save";
//点赞记录
$route['content/record'] = "main/content/content_record";
$route['reply/record'] = "main/reply/reply_record";
//登录
$route['login'] = "main/user/login_index";
$route['login/login_in'] = "main/user/login_in";
$route['login/login_out'] = "main/user/login_out";
//注册
$route['register'] = "main/user/register";
$route['register/save'] = "main/user/register_save";
//查看某人发表的全部内容
$route['member/(:any)'] = "main/content/member/$1";
$route['member_list'] = "main/content/member_list";
//用户中心
$route['user/info'] = "main/user/user_info";
$route['user/avatar'] = "main/user/user_avatar";
$route['user/validate'] = "main/user/user_validate";
$route['user/save'] = "main/user/info_save";
$route['user/nick/save'] = "main/user/nick_save";
$route['user/avatar/save'] = "main/user/avatar_save";
//admin后台
$route['admin'] = "admin/admin/index";
$route['admin/content'] = "admin/admin/content";
$route['admin/content_list'] = "admin/admin/content_list";
$route['admin/content_delete'] = "admin/admin/content_delete";
$route['admin/content_pass'] = "admin/admin/content_pass";
$route['admin/content_fail'] = "admin/admin/content_fail";

$route['admin/user'] = "admin/admin/user";
$route['admin/user_list'] = "admin/admin/user_list";
$route['admin/user_delete'] = "admin/admin/user_delete";
$route['admin/user_add_admin'] = "admin/admin/user_add_admin";
$route['admin/user_remove_admin'] = "admin/admin/user_remove_admin";

$route['admin/black'] = "admin/admin/black";
$route['admin/black_list'] = "admin/admin/black_list";
$route['admin/black_delete'] = "admin/admin/black_delete";

$route['admin/reply'] = "admin/admin/reply";
$route['admin/reply_list'] = "admin/admin/reply_list";
$route['admin/reply_delete'] = "admin/admin/reply_delete";

$route['error'] = 'main/content/error';

$route['default_controller'] = "main/content/xian";
$route['404_override'] = '';

$route['api/([a-z0-9]+)/(\d+)'] = "api/$1/index/$2";
/* End of file routes.php */
/* Location: ./application/config/routes.php */