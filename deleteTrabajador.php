<?php
require_once 'db.php';

$cnn = OpenDbConnection();
$obj = json_decode($_GET["x"]);
echo "obj->tra_ide= ".$obj->tra_ide;
echo "<br>";

$result = pg_prepare($cnn, "myquery2", 'UPDATE PRUEBA.TRABAJADOR SET est_ado=0 WHERE tra_ide = $1');
if (!$result) {
    echo "An error occurred.\n";
    exit;
}
$result = pg_execute($cnn, "myquery2", array($obj->tra_ide));
$outp = pg_fetch_all($result);

// echo json_encode($outp);

//if I close the connection the ajax call fails
//status "Internal Server Error"
// pg_closse($cnn);
?>