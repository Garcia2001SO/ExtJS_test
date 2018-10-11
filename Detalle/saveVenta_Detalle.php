<?php
require_once '../db.php';

$cnn = OpenDbConnection();
$obj = json_decode($_GET["x"]);
$obj->ven_ide = $_GET["y"];
$obj->v_d_tot = $obj->v_d_can * $obj->v_d_uni;

$result = pg_prepare($cnn, "myquery", 'INSERT INTO PRUEBA.VENTA_DETALLE(ven_ide, v_d_pro, v_d_uni, v_d_can, v_d_tot) VALUES($1, $2, $3, $4, $5)');
$result = pg_execute($cnn, "myquery", array(
    $obj->ven_ide,
    $obj->v_d_pro,
    $obj->v_d_uni,
    $obj->v_d_can,
    $obj->v_d_tot
));
    if (!$result) {
        echo "An error occurred.\n";
        exit;
    }
$outp = pg_fetch_all($result);

echo json_encode($outp);
?>