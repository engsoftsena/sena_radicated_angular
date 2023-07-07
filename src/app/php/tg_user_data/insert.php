<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$json = file_get_contents('php://input');
$params = json_decode($json);

require('../settings/configuration.php');

$query = "INSERT INTO tg_user_data (
  `ab_by_created`,
  `ab_by_modified`,
  `ab_date_created`,
  `ab_date_modified`,
  `ab_deleted`,
  `ab_description`,
  `ab_import`,
  `ab_level`,
  `ab_record`,
  `ab_status`,
  `ab_temp`,
  `ac_email`,
  `ac_login`,
  `ac_password`,
  `tg_role_data`
  ) VALUES (
    '1',
    '1',
    '" . DATE_HOUR . "',
    '" . DATE_HOUR . "',
    '1',
    '',
    '1',
    '1',
    '1',
    '1',
    '1',
    ?,
    ?,
    ?,
    ?
  )";

$stmt = mysqli_prepare($connect, $query);
mysqli_stmt_bind_param(
  $stmt,
  'ssss',
  $params->email,
  $params->login,
  password_hash($params->password, PASSWORD_DEFAULT),
  $params->role_data
);
mysqli_stmt_execute($stmt);

if (mysqli_stmt_affected_rows($stmt) > 0) {
  $response = new stdClass();
  $response->resultado = 'OK';
  $response->mensaje = 'Registro Almacenado Correctamente';

  $json = json_encode($response);
  echo $json;
} else {
  $response = new stdClass();
  $response->resultado = 'Error';
  $response->mensaje = 'Error: Query Insert Fallida';

  $json = json_encode($response);
  echo $json;
}

mysqli_stmt_close($stmt);
mysqli_close($connect);
