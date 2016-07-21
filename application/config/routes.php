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
$route['pic'] = "main/content/pic";
$route['pic/(:any)'] = "main/content/pic/$1";
$route['pic/(:any)/(:num)'] = "main/content/pic/$1/$2";
//段子
$route['duan'] = "main/content/duan";
$route['duan/(:any)'] = "main/content/duan/$1";
$route['duan/(:any)/(:num)'] = "main/content/duan/$1/$2";
//妹子
$route['meizi'] = "main/content/meizi";
$route['meizi/(:any)'] = "main/content/meizi/$1";
$route['meizi/(:any)/(:num)'] = "main/content/meizi/$1/$2";
//故事
$route['tale'] = "main/content/tale";
$route['tale/(:any)'] = "main/content/tale/$1";
$route['tale/(:any)/(:num)'] = "main/content/tale/$1/$2";
//渣渣说
$route['zzs'] = "main/content/zzs";
$route['zzs/(:any)'] = "main/content/zzs/$1";
$route['zzs/(:any)/(:num)'] = "main/content/zzs/$1/$2";
//程序猿
$route['cxy'] = "main/content/cxy";
$route['cxy/(:any)'] = "main/content/cxy/$1";
$route['cxy/(:any)/(:num)'] = "main/content/cxy/$1/$2";

//markdown
$route['mdedit'] = "main/content/markdown";

//详情
$route['detail'] = "main/content/pic"; //没参数时直接跳首页
$route['detail/(:num)/(:any)'] = "main/content/article_detail/$1/$2";
$route['single/(:num)/(:any)'] = "main/content/content_detail/$1/$2";
//回复列表，回复
$route['reply'] = "main/reply/reply_list";
$route['reply/save'] = "main/reply/reply_save";
//保存
$route['content/save'] = "main/content/content_save";
$route['article/save'] = "main/content/article_save";
//点赞记录
$route['content/record'] = "main/content/content_record";
$route['article/record'] = "main/content/article_record";
$route['reply/record'] = "main/reply/reply_record";
//登录
$route['login'] = "main/user/login_index";
$route['login/login_in'] = "main/user/login_in";
$route['login/login_out'] = "main/user/login_out";
$route['login/third_qq/(:any)'] = "main/user/login_qq/$1";
$route['login/third_wb/(:any)'] = "main/user/login_wb/$1";
$route['login/third_wx/(:any)'] = "main/user/login_wx/$1";
//注册
$route['register'] = "main/user/register";
$route['register/save'] = "main/user/register_save";
//查看某人发表的全部内容
$route['member/(:any)'] = "main/member/member_index/$1";
$route['member_list'] = "main/member/member_list";
//绑定
$route['user/bind'] = "main/user/bind";
$route['user/bind/save'] = "main/user/bind_save";
//激活
$route['user/validate/(:any)'] = "main/user/user_validate/$1";
//昵称保存
$route['user/nick/save'] = "main/user/nick_save";
//用户中心
$route['member'] = "main/member/homepage";
$route['member/info'] = "main/member/user_info";
$route['member/valid_email'] = "main/member/valid_email";
$route['member/avatar'] = "main/member/user_avatar";
$route['member/pass'] = "main/member/user_pass";
$route['member/save'] = "main/member/info_save";
$route['member/avatar/save'] = "main/member/avatar_save";
$route['member/pass/save'] = "main/member/pass_save";
//得到ppt目录
$route['ppt'] = "main/content/ppt";

//admin后台
$route['admin'] = "admin/admin/index";
$route['admin/content'] = "admin/admin/content";
$route['admin/article'] = "admin/admin/article";
$route['admin/user'] = "admin/admin/user";
$route['admin/reply'] = "admin/admin/reply";
$route['admin/black'] = "admin/admin/black";
$route['admin/record'] = "admin/admin/record";
$route['admin/nav'] = "admin/admin/nav";
$route['admin/access'] = "admin/admin/access";

//统计
$route['admin/count_content'] = "admin/count/count_content";
$route['admin/count_access'] = "admin/count/count_access";
$route['admin/count_content_data'] = "admin/count/count_content_data";
$route['admin/count_access_data'] = "admin/count/count_access_data";
//得到列表
$route['admin/list/(:any)?(:any)'] = "admin/admin/main_list/$1/$2";
$route['admin/list/(:any)'] = "admin/admin/main_list/$1";
//通用删除
$route['admin/delete/(:any)'] = "admin/admin/delete/$1";
//回复删除
$route['admin/reply_delete'] = "admin/admin/reply_delete";
//审核通过
$route['admin/pass/(:any)'] = "admin/admin/pass/$1";
//审核失败
$route['admin/fail/(:any)'] = "admin/admin/fail/$1";
//增加管理员
$route['admin/user_add_admin'] = "admin/admin/user_add_admin";
//移除管理员
$route['admin/user_remove_admin'] = "admin/admin/user_remove_admin";
//用户权限管理
$route['admin/user_permission'] = "admin/admin/user_permission";
//用户权限更新
$route['admin/user_priv_update'] = "admin/admin/user_priv_update";
//得到单条记录
$route['admin/get_row/(:any)'] = "admin/admin/get_row/$1";
//导航单条记录更新
$route['admin/nav_update'] = "admin/admin/nav_update";
//内容和文章后台单条记录更新
$route['admin/update_row/(:any)'] = "admin/admin/update_row/$1";
//黑名单文本
$route['admin/black_text'] = "admin/admin/black_text";
//黑名单文本更新
$route['admin/black_update'] = "admin/admin/black_update";
$route['error'] = 'main/content/error';

$route['default_controller'] = "main/content/pic";
$route['404_override'] = 'main/content/pic';

$route['api/([a-z0-9]+)/(\d+)'] = "api/$1/index/$2";
/* End of file routes.php */
/* Location: ./application/config/routes.php */