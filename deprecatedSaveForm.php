<?php
require_once 'db.php';

$cnn = OpenDbConnection();
$obj = json_decode($_GET["x"], false);

$sql = <<<EOF
    INSERT INTO prueba.trabajador (tra_cod, tra_nom, tra_pat, tra_mat)
    VALUES ($obj->Codigo, '$obj->Nombre', '$obj->Paterno', '$obj->Materno');
EOF;

pg_query($cnn, $sql);

// pg_close($cnn);
?>