<?php 
function OpenDbConnection(){
  $dbhost = 'host = 127.0.0.1';
  $dbport = 'port = 5432';
  $dbname = 'dbname = mydb2';
  $dbcredentials = 'user = postgres password = 1234';

  $db = pg_connect("$dbhost $dbport $dbname $dbcredentials");
  
  // if (!$db) {
  //   echo "Unable to open the database\n" ;
  //   exit();
  // } else {
  //   echo "Opened database successfully\n";
  // }

  return $db;
}
?>