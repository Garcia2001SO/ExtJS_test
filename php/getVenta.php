<?php
require_once 'db.php';

$cnn = OpenDbConnection();

$result = pg_prepare($cnn, "myquery", 'SELECT * FROM PRUEBA.VENTA');
$result = pg_execute($cnn, "myquery", array());
    if (!$result) {
        echo "An error occurred.\n";
        exit;
    }
$outp = pg_fetch_all($result);

echo json_encode($outp);
?>