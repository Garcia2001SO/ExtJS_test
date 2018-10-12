<?php
require_once 'db.php';

$cnn = OpenDbConnection();
$obj = json_decode($_GET["x"]);

$result = pg_prepare($cnn, "myquery", 'INSERT INTO PRUEBA.VENTA(ven_ser, ven_num, ven_cli, ven_mon) VALUES($1, $2, $3, $4)');
$result = pg_execute($cnn, "myquery", array(
    $obj->ven_ser,
    $obj->ven_num,
    $obj->ven_cli,
    $obj->ven_mon
));
    if (!$result) {
        echo "An error occurred.\n";
        exit;
    }
$outp = pg_fetch_all($result);

echo json_encode($outp);
?>