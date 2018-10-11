<?php
require_once 'db.php';

$cnn = OpenDbConnection();
$obj = json_decode($_GET["x"]);

$sql = <<<EOF
    INSERT INTO prueba.trabajador (tra_cod, tra_nom, tra_pat, tra_mat)
    VALUES ('$obj->tra_cod', '$obj->tra_nom', '$obj->tra_pat', '$obj->tra_mat');
EOF;

pg_query($cnn, $sql);

// pg_close($cnn);
?>