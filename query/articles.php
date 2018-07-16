<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require('data.php');
require('db.php');

if(!(isset($_GET) && count($_GET) > 0)) exit;
else{
    $data = new Data();
    $get = $data->reqsecure();
    if(count($get) > 0){
        $db = new Database();
        $con = $db->connect();
        $pid = isset($get['pid']) ? $get['pid'] : 1;
        $did = isset($get['did']) ? $get['did'] : 1;
        if($con==="success" && $get['type']==="get"){
            $articles = $db->getArts($pid-1);
            echo json_encode($articles);
        } else if($con==="success" && $get['type']==="art"){
            $articles = $db->getArts($pid-1,null,$did);
            echo json_encode($articles);
        }
    }
}

?>