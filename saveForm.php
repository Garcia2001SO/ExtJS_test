<?php
require_once 'db.php';

$cnn = OpenDbConnection();
$obj = json_decode($_GET["x"], true);

$sql = <<<EOF
    INSERT INTO prueba.trabajador (tra_cod, tra_nom, tra_pat, tra_mat)
    VALUES ('$obj[0]', '$obj[1]', '$obj[2]', '$obj[3]');
EOF;

pg_query($cnn, $sql);

// pg_close($cnn);
?>