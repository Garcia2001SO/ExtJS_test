<?php
require_once 'db.php';

$cnn = OpenDbConnection();
$obj = json_decode($_GET["x"]);

$result = pg_prepare($cnn, "myquery", 'UPDATE PRUEBA.VENTA_DETALLE SET est_ado=0 WHERE ven_ide=$1');
$result = pg_execute($cnn, "myquery", array($obj->ven_ide));
    if (!$result) {
        echo "An error occurred.\n";
        exit;
    }
$outp = pg_fetch_all($result);

echo json_encode($outp);
?>