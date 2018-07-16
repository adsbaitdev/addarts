<?php
class Database{
    
    private $conn;
    private $servername = "localhost";
    private $dbname = "cryptolk_adsbait_blog";
    private $username = "cryptolk_benc";
    private $password = "bencCrypto321!";
    private $artcolumns = "id,imgurl, title, date, htext, content";
    
    public function __construct(){
        
    }
    
    public function connect(){
        try {
            $this->conn = new PDO("mysql:host=$this->servername;dbname=".$this->dbname, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return "success";
        }
        catch(PDOException $e)
        {
            echo "Connection failed: " . $e->getMessage();
        }
    }
    
    public function getArts($start, $limit = 12, $did = false){
        $limit = is_null($limit) ? 12 : $limit;
        $go = $start===0 ? $start : $start*$limit;
        $sql = 'SELECT '.$this->artcolumns.', (select count(*) from articles) as artnum, "'.$limit.'" as lim,
        (SELECT id FROM articles WHERE id > art.id ORDER BY id LIMIT 1) as nextid,
        (SELECT id FROM articles WHERE id < art.id ORDER BY id DESC LIMIT 1) as previd
            FROM articles as art
            ORDER BY id Desc
            LIMIT '.$go.','.$limit;
        if($did){
            $sql = 'SELECT '.$this->artcolumns.', (select count(*) from articles) as artnum, "'.$limit.'" as lim,
                (SELECT id FROM articles WHERE id > "'.$did.'" ORDER BY id LIMIT 1) as nextid,
                (SELECT id FROM articles WHERE id < "'.$did.'" ORDER BY id DESC LIMIT 1) as previd
                FROM articles
                WHERE id="'.$did.'"';
        }
        $sth = $this->conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $sth->execute();
        $resp = $sth->fetchAll(PDO::FETCH_ASSOC);
        return $resp;
    }
    
    public function close(){
        
    }
    
    public function __destruct(){
        
    }
}
?>