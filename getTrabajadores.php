<?php
require_once 'db.php';

$cnn = OpenDbConnection();
$sql = <<<EOF
    SELECT * FROM prueba.Trabajador;
EOF;

$ret = pg_query($cnn, $sql);

$i = 0;
while($row = pg_fetch_row($ret)){
    $myArr2[$i] = $row;
    $i++;
}

$myJSON4 = json_encode($myArr2);
echo $myJSON4;

//if I close the connection the ajax call fails
//status "Internal Server Error"
// pg_closse($cnn);
?>