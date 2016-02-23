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

$route['pic'] = "girl";
$route['pic/(:num)'] = "girl/index/$1";

$route['joke'] = "joke";
$route['joke/(:num)'] = "joke/index/$1";

$route['know'] = "know";
$route['know/(:num)'] = "know/index/$1";

$route['myth'] = "myth";
$route['detail'] = "myth";
$route['myth/(:num)'] = "myth/index/$1";
$route['myth/detail/(:num)'] = "myth/detail/$1";

$route['default_controller'] = "joke";
$route['404_override'] = '';

$route['admin'] = "admin/admin/index";
$route['api/([a-z0-9]+)/(\d+)'] = "api/$1/index/$2";
/* End of file routes.php */
/* Location: ./application/config/routes.php */