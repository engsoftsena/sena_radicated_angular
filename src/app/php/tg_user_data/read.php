<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require('../settings/configuration.php');

$query = "SELECT * FROM tg_user_data";
$sql = mysqli_query($connect, $query) or die('Error: Query Consulta Fallida');

$data = [];
while ($register = mysqli_fetch_array($sql)) {
  $data[] = $register;
}

$json = json_encode($data);
echo $json;
header('Content-Type: application/json');
