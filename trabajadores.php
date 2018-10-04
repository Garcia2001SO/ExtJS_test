<?php
init_set("display_errors", true);
init_set("html_errors", true);

include "db.php";

$out = "";
$filterJson = "";
$filter = "";
$start = 0;
$limit = 0;

if (isset($_REQUEST["start"]) && $_REQUEST["start"] != "") {
	$start = $_REQUEST["start"];
}
if (isset($_REQUEST["limit"])) {
	$limit = $_REQUEST["limit"];
}

if (isset($_REQUEST["filter"])) {
	$filterJson = $_REQUEST["filter"];
    $filter = json_decode($filterJson);
}

$out = GetEmployees($filter, $start, $limit);

echo utf8_encode($out);

function GetEmployees($filter, $start, $limit) {
    
	  $retVal = "[]";
	  
	  $sql ="SELECT COUNT(tra_ide) FROM 'prueba.trabajador'";
      
      if ($filter != "") {  
        $property = $filter[0]->property;
        $sql .= " WHERE $property = " . $filter[0]->value;
      }
      
      if ($limit != 0) {  
        $sql .= " LIMIT " . $start . ", " . $limit;
      }
      
      $conn = OpenDbConnection();

	  $result = pg_query($conn, $sql); 

	  $row = pg_fetch_row($result);
	  
	  $num = $row[0];

	  $sql ="SELECT * FROM 'prueba.trabajador'";
	
	 if ($filter != "") {  
        $property = $filter[0]->property;
        $sql .= " WHERE $property = " . $filter[0]->value;
      }
      
      if ($limit != 0) {  
        $sql .= " LIMIT " . $start . ", " . $limit;
      }
    
    $result = pg_query($conn, $sql);
	
	$i = 0;
	
	$employeesData = array("count" => $num, "employees" => array());
	
	while ($row = pg_fetch_assoc($result)) {    
		$employeesData["employees"][$i] = $row;    
		$i++;  
	}   
	
	CloseDbConnection($conn); 
	
	return json_encode($employeesData); 
}
?>