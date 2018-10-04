<?php
require_once 'db.php';

// $myObj->name = "John";
// $myObj->age = 30;
// $myObj->city = "New York";

// $myJSON1 = json_encode($myObj);

// echo $myJSON1;
// echo "<br>";

// $myArr = array("John", "Mary", "Peter", "Sally");

// $myJSON2 = json_encode($myArr);

// echo $myJSON2;
// echo "<br>";

//----------------
// DATABASE STUFF
//----------------
$cnn = OpenDbConnection();
$sql = <<<EOF
    SELECT * FROM prueba.Trabajador;
EOF;

 $ret = pg_query($cnn, $sql);
  
// if(!$ret){
//     echo pg_last_error($cnn);
//     exit;
// }

while($row = pg_fetch_row($ret)){
    $queryObj->tra_ide = $row[0];
    $queryObj->tra_cod = $row[1];
    $queryObj->tra_nom = $row[2];
    $queryObj->tra_pat = $row[3];
    $queryObj->tra_mat = $row[4];
    $queryObj->est_ado = $row[5];
    $myArr2 = $row;
}

$myJSON3 = json_encode($queryObj);
// echo $myJSON3;
// echo "<br>";

$myJSON4 = json_encode($myArr2);
echo $myJSON4

//if I close the connection the ajax call fails
//status "Internal Server Error"
// pg_closse($cnn);
?>