<?php
require_once 'db.php';

$cnn = OpenDbConnection();
$obj = json_decode($_GET["x"]);
echo "obj->tra_ide= ".$obj->tra_ide;
echo "<br>";

$result = pg_prepare($cnn, "myquery2", 'UPDATE PRUEBA.TRABAJADOR SET tra_cod=$2, tra_nom=$3, tra_pat=$4, tra_mat=$5 WHERE tra_ide = $1');
if (!$result) {
    echo "An error occurred.\n";
    exit;
}
$result = pg_execute($cnn, "myquery2", 
array($obj->tra_ide,
$obj->tra_cod,
$obj->tra_nom,
$obj->tra_pat,
$obj->tra_mat));
$outp = pg_fetch_all($result);

// echo json_encode($outp);

//if I close the connection the ajax call fails
//status "Internal Server Error"
// pg_closse($cnn);
?>