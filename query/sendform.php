<?php

require('data.php');
if(!(isset($_POST) && count($_POST) > 0)) exit;
else{
	$data = new Data();
	$post = $data->secure("POST");
	if(count($post) > 0) echo $data->signin($post);
}
?>