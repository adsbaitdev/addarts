<?php
class Data{
    
    public function __construct(){
    }
    
    public function reqsecure(){
        $req = array();
        foreach($_REQUEST as $key => $value){
            $req[$key] = htmlspecialchars(trim($value));
        }
        return $req;
    }
    
    public function secure($type){
        $name = self::getType($type);
        return filter_input_array($name, [
            "user" => FILTER_SANITIZE_STRING,
            "password" => FILTER_SANITIZE_STRING
        ]);
    }
    public function signin($data){
        $mdpass = md5($data['password'],true);
        return $mdpass;
    }
    
    private function getType($type){
        if($type==="GET") return INPUT_GET;
        if($type==="COOKIE") return INPUT_COOKIE;
        if($type==="SERVER") return INPUT_SERVER;
        if($type==="ENV") return INPUT_ENV;
        return INPUT_POST;
    }
    
    public function __destruct(){
        
    }
}
?>