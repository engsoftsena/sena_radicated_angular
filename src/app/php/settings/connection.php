<?php
$connect = mysqli_connect(
  CREDENTIAL['host'],
  CREDENTIAL['user'],
  CREDENTIAL['pass'],
) or die('Conexion Incorrecta');

$select_db = mysqli_select_db(
  $connect,
  CREDENTIAL['name'],
) or die('Error: Base de Datos Incorrecta');
