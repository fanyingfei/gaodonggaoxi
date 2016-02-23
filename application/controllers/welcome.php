<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */


    public function index()
	{

       // session_start();
     //   $_SESSION['user_id'] = 6;
      //  echo $_SESSION['user_id'];exit;
        $this->load->view('welcome_message');
	}

    public function find(){
        echo date('Y-m-d H:i:s').'-----------------';
     //   require_once('upload.php');
     //   $aes = new upload();
     //   $aes->set_key('KeLy8g7qjmnbgWP1');
     //   $aes->require_pkcs5();
     //   $url = 'http://58.56.128.84:9001/EAI/service/VOM/CommonGetWayToVOM/CommonGetWayToVOM';
        $url = 'http://shop.whaley.cn/api/order';
     //   $data['notifyid'] = time();
     //   $data['notifytime'] = date('Y-m-d H:i:s');
     //   $data['butype'] = 'rrs_realtime';
     //   $data['source'] = 'WHALEY';
     //   $data['type'] = 'xml';
     //   $str = '<Code><expno>6091276656</expno></Code>';
    //    $data['content'] = json_encode(array('Code'=>array('expno'=>'6091276656')));
     //   echo $aes->decrypt($aes->encrypt($str));exit;
     //   $data['content'] = urlencode($aes->encrypt($str));
      //  $data['sign'] = urlencode(base64_encode($aes->encrypt($data['content'])));
      //  $data['sign'] = base64_encode(md5($str."RRS,123"));
        $data['act'] = 'order_list';
        $data['page'] = 1;
        $data['limit'] = 10;
for($i=0;$i<1000;$i++){
    $this->post($url,$data);
}
      //  echo $data['sign'];
     //   $res = $this->post($url,$data);print_r($res);exit;
        //$data['expno'] = '6091276656';
echo date('Y-m-d H:i:s');
      //  $logistics = simplexml_load_string ($res);print_r($logistics);exit;
     //   $url = $_POST['url'];
     //   $data['page'] = $_POST['page'];
        $res = $this->grab_curl($url,$data);
        print_r($res);

    }

    function grab_curl($url,$post_data){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0); //不带头信息
        curl_setopt($ch, CURLOPT_TIMEOUT,5);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //不输出到屏幕上
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        return curl_exec($ch);
    }


    function post($url,$post_data){
        $ip = '';
        $post = '';
        $timeout = 10;
        $limit = 500000;
        $matches = parse_url($url);

        foreach($post_data as $k => $v) {
            if($k != 'limit'){
                $post .= $k.'='.$v.'&';
            }else{
                $post .= $k.'='.$v;
            }
        }

        !isset($matches['host']) && $matches['host'] = '';
        !isset($matches['path']) && $matches['path'] = '';
        !isset($matches['query']) && $matches['query'] = '';
        !isset($matches['port']) && $matches['port'] = '';
        $host = $matches['host'];
        $path = $matches['path'] ? $matches['path'].($matches['query'] ? '?'.$matches['query'] : '') : '/';
        $port = !empty($matches['port']) ? $matches['port'] : 80;


        $out = "POST $path HTTP/1.0\r\n";
        $out .= "Accept: */*\r\n";
        $out .= "Accept-Language: zh-cn\r\n";
        $out .= "Content-Type: application/x-www-form-urlencoded\r\n";
        $out .= "User-Agent: $_SERVER[HTTP_USER_AGENT]\r\n";
        $out .= "Host: $host\r\n";
        $out .= 'Content-Length: '.strlen($post)."\r\n";
        $out .= "Connection: Close\r\n";
        $out .= "Cache-Control: no-cache\r\n";
        $out .= "Cookie: ws_visitor=82741e2e078cec076f805d5b563a351033c78342; Hm_lvt_b4a4c6dc4ff5d3fb8fcb387174016e5a=1438738670
,1438825047,1438911695,1438939082; Hm_lpvt_b4a4c6dc4ff5d3fb8fcb387174016e5a=1438940350; ws_gid=WS-9AF63181-8B5A-4332-9F6E-82B78D7ADA93
; nickname=%E6%82%AC%E7%AC%94%E9%A2%98%E6%9E%AB%E6%9C%88; isLogin=d09f83e644f81875924ceb915fb742ec; sexpires
=1439026726; helioshome_token=c5c1ngmJL9lYbu0D2FULsWjTYQb%2BKHRRBO6AhrsotMC6y98KqUTpVYLX5DbouqyLDa0scyu
%2BL2ec15pgSIhyDeLbLQ1WnZr9SqJAhOJxAF2Ev42GhE4nN%2FQOSlFwX60%2FcNLmJ9NiR%2BgR7c7nQriM0oJ8aXBYHX0lFdLmH1KZz37fEuwkb5Hznqfbi7zbUBsncH
%2F0HEB70AbEbSLguhRxiDybbwqSwV69shfok1gZmIH7y4AhtpWefCRPw6lY1KBapFRysc%2FbXvHklof1; heliosbbs_token=b6d0ZFiS7TpwAR3Jq6MUZjrBAewESeeuGl5mRYPvDXb1f79cta7e3xGAYfrKxGBG6vAk1nCyNJ
%2B3etHYON1Mf8333KjdsSeKvOgB%2Fiute1pjyBJNauTJilJwwNA9gAc1ILl9gGByvmYVMVLdypeVswdlLwQZ4Zh%2BZ3kIxBrCbVdrTsLSOAyPj
%2FdexAHGC8MjSejXxcdGuoPbIfxfts4dXYR2TZ%2FZNoQIzHkp%2BV%2B3txMd2Lys0q0Cic3dLlMAsXw6x2qyul%2FvH08aZ16G
; helios_auth=09ccwpoQcNG4K%2FUT5%2BSivI6gwXRABgR5vL7vTY9D%2FxSOGg1YPvRxMP0e1PBokyahve9CPftFhGwVZJPUP3xryVgLTnpKVqORl7AyH0bUz0XQcV0MI2grwalVBb7VtSMtNKoeHCzaT1w9s
%2BYBtpE0kwU; helioshop_token=e786cnqB4He6IZl9awTmjSo76ouMzRsTVKdDJS1aQHfvL%2BhRxD8dIeinhGSNVUAoPvZaKYSDUWrqjooW3
%2BTFGIjfsiKEwTbt%2Bp02e%2BK%2FxSxsPfJrH%2B9y937KuDF8tRxv9tqcshd0aN4PrRxdMq8ETFyWpZSBJ8uYM5yQqPnb0xhv
%2F3VkI7KRH13DcEdiQMJCMtf1CECxulFCEhSC%2BI19t0MJoClV3zj5FkORsvabB%2B4PgYyfKBUq36ez3MgAOmK%2FOnbc0ApANkQElrv7
; heliostestbbs_token=6f7eNPl30FIJkAd5e%2BkHsiJe9h1r3iEEebJ52CAs7SyVQX0ofOtjqeX%2Bd%2FvO8seTlI%2FtpUuKKCaOY3YJI5OwCicW39F
%2FQZbNpaj5bMqmD5%2FFR6qKFztocyhCb8F51m4Zg%2Fn71dowEx8nRv6MUsMedS7hbUUeyOlJWImv1Bi06JzoIdtFEryTL618epwhQiE7WzP2
%2FQlEXI57gAMWal2Os0cd8GoG%2F6sp%2F4XiNi2hyY6YpNmKkRktLMkNgYZZSgfxVeOZ0GNA3SJFQE2M; heliosbbspre_token
=4c80%2FzeCKDtCtzOcG%2Fcs%2B0IIheid5cFribB4e1fFj5plxV4Mx9ohMkKF86nyE%2Feb0c55GLK%2BeXiOATML8CTGBCIL0W920gty
%2B4xl9mgFCWgWpWvmQgnUb0DCFv9DVvOEgV0%2Fm%2B77FGSg9D0gL%2FwMZHlQhXNPTBLMu4SYHAuodwkae8LXHc5AkQYvPoNomxtYiOFpXZh0FdwCH5wy5nMh4FM6zCrAZ
%2BLzAqLXVEr1FyA9PpkVOmuGsr63ynN6W2zBMiD8ZZ%2F%2FykyGuuK2; ws_uname=%E6%82%AC%E7%AC%94%E9%A2%98%E6%9E
%AB%E6%9C%88; ws_uid=741; ws_auth=0f87DtSxB1srktNXb9mJVASsZ1zlmLRZTkp3ZcQIrlwt%2BzMJm3tqc%2FTCmgBzVPREHsP5ZbbiLK1b
%2BYzZwChIR1lgEO6Rk24wyQmAMfhwZfey; ws_history=1; ws_cart_num=0\r\n\r\n";
        $out .= $post;

        $fp = @fsockopen(($ip ? $ip : $host), $port, $errno, $errstr, $timeout);
        if(!$fp) {
            return false;
        } else {
          //  stream_set_blocking($fp, TRUE);
          //  stream_set_timeout($fp, $timeout);
            @fwrite($fp, $out);
           /* $status = stream_get_meta_data($fp);
            if(!$status['timed_out']) {
                while (!feof($fp)) {
                    if(($header = @fgets($fp)) && ($header == "\r\n" ||  $header == "\n")) {
                        break;
                    }
                }

                $stop = false;
                $return = '';
                while(!feof($fp) && !$stop) {
                    $data = fread($fp, ($limit == 0 || $limit > 8192 ? 8192 : $limit));
                    $return .= $data;
                    if($limit) {
                        $limit -= strlen($data);
                        $stop = $limit <= 0;
                    }
                }
            }*/
            @fclose($fp);
         //   return $return;
        }

    }

    public function zhu(){
        $pdo = new PDO("mysql:host=localhost;dbname=fanfan","root","");
        $sql = 'set names "utf8"';
        $pdo->query($sql);
        $sql = 'select * from jokes where status = 2 limit 10';
        $res = $pdo->query($sql);
        $res = $res->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($res);


        exit;
        include_once APPPATH.'phpQuery/phpQuery.php';
     //   $content = file_get_contents('http://jandan.net/ooxx/page-1372#comments');
        $pdo = new PDO("mysql:host=localhost;dbname=fanfan","root","");
        phpQuery::newDocumentFile('http://www.duzhebao.com/xiaohua/1.htm');
     //   echo pq('.commentlist li[id]')->filter('.test p img')->attr('src');
     //   echo pq('.commentlist li[id] ')->html();
        $result = array();
        $sql = 'set names "utf8"';
        $pdo->query($sql);
        $data['content'] = '为什么不行';
        $data['user_id'] = 1;
        $data['status'] = 2;
        $now = date("Y-m-d H:i:s",time());
        $data['joke_name'] = '';

        $pdo -> exec("insert into jokes(user_id,joke_name,content,md5,status,updated_at,created_at) values
							(1,'".$data['joke_name']."','".$data['content']."','".$data['md5']."',2,'".$now."','".$now."')");
        echo 11;exit;
        foreach($companies as $company)
        {
            $img_url =  pq($company)->find('.text p img')->attr('src');
            array_push($result,$img_url);
        }
        print_r($result);exit;

        $companies = pq('#hotcoms .coms')->find('div');
        foreach($companies as $company)
        {
            echo pq($company)->find('h3 a')->text()."<br>";
        }
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */