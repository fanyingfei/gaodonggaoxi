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
$route['default_controller'] = "content/joke";
$route['404_override'] = '';

$route['joke'] = "content/joke";
$route['joke/(:num)'] = "content/joke/$1";

$route['know'] = "content/know";
$route['know/(:num)'] = "content/know/$1";

$route['wen'] = "content/wen";
$route['wen/(:num)'] = "content/wen/$1";

$route['wl'] = "content/wl";
$route['wl/(:num)'] = "content/wl/$1";

$route['meizi'] = "content/meizi";
$route['meizi/(:num)'] = "content/meizi/$1";

$route['myth'] = "article/myth";
$route['myth/detail'] = "article/detail";
$route['myth/(:num)'] = "article/index/$1";
$route['myth/detail/(:num)'] = "article/detail/$1";


$route['zzs'] = "article/zzs";
$route['zzs/detail'] = "article/detail";
$route['zzs/(:num)'] = "article/zzs/$1";
$route['zzs/detail/(:num)'] = "article/zzs/$1";

$route['admin'] = "admin/admin/index";
$route['api/([a-z0-9]+)/(\d+)'] = "api/$1/index/$2";
/* End of file routes.php */
/* Location: ./application/config/routes.php */