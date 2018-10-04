<?php include_once ("config/configData.php"); $name = _FISTNAME." "._LASTNAME; $sw=_SOFTWAREDESCRIPTION; $sn = _SOFTWARENAME; ?>
<?php if (file_exists("config/version.php")) include_once ("config/version.php"); else $v = 0.01;?>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta charset="UTF-8" />  
    <title><?php echo $sn; ?></title>
    <link rel="Shortcut Icon" href="images/sistema/siggo.ico" type="image/x-icon" />
    <script src = "extjs/ext-all-debug-w-comments.js" type = "text/javascript"></script>
    <script src = "jsonTests.js" type = "text/javascript"></script>
    <script src = "app.js" type = "text/javascript"></script>
</head>
<body>
<p id="demo">
<p id="status">
<p id="retrievedData">
	<div class="left-column">
		<link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css" href="extjs/example.css" />
	</div>
	<div id="grid-example"></div>
</body>
</html>
