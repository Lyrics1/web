<?php
require_once  'D://JS/php-sdk-7.1.3/autoload.php';

use Qiniu\Auth;
//$bucket = 'oml6c8wwo.bkt.clouddn.com';
 $bucket = 'test1';

$accessKey = '3HMl27Klnos06QrHVD-Ru_VIivF_-MbeMRyfmNLp';
$secretKey = 'bOvyZ0XG9podSxyXYgJUyD-qEP0nulnFvu3lkzFk';

$auth = new Auth($accessKey, $secretKey);
$upToken = $auth->uploadToken($bucket);

echo $upToken;
?>