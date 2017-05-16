<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/4/5
 * Time: 17:39
 */
$dsn = "mysql:host=115.28.219.231;dbname=website_race";

$user = "race";

$pass = "jN4rqKH4JW7eSuZY";
class db extends PDO{
    public function __construct(){
        try {
            parent::__construct("$GLOBALS[dsn]","$GLOBALS[user]","$GLOBALS[pass]",array(PDO::ATTR_PERSISTENT => true));
            parent::exec("set names utf8");
            //echo "DB connect";
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
        }
    }


    public final function sel($sql){
        try{
            return parent::prepare($sql);
        }catch (PDOException $e){
            echo 'error ' . $e->getMessage();
        }
        return false;
    }

    public final function exec($sql){
        try{
            return parent::prepare($sql);
        }catch (PDOException $e){
            echo 'error ' . $e->getMessage();
        }
        return false;
    }

    public final function setString(&$string,$low = False)
    {
        if (! is_array ( $string ))
        {
            $string = trim ( $string );
            $string = strip_tags ( $string );
            $string = htmlspecialchars ( $string );
            if ($low)
            {
                return True;
            }
            $string = str_replace ( array ('"', "\\", "'", "/", "..", "../", "./", "//" ), '', $string );
            $no = '/%0[0-8bcef]/';
            $string = preg_replace ( $no, '', $string );
            $no = '/%1[0-9a-f]/';
            $string = preg_replace ( $no, '', $string );
            $no = '/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/S';
            $string = preg_replace ( $no, '', $string );
            return True;
        }
        $keys = array_keys ( $string );
        foreach ( $keys as $key )
        {
            setString ( $string [$key] );
        }
        return true;
    }
}



