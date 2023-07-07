<?php
//require('../../setting/Credential');

class ConnectionException extends Exception
{
  public function __construct(
    string $message = "",
    int $code = 0,
    Throwable $previous = null
  ) {
    parent::__construct($message, $code, $previous);
  }
}

try {
  $mysqli = new mysqli(
    CREDENTIAL['host'],
    CREDENTIAL['user'],
    CREDENTIAL['pass'],
    CREDENTIAL['base'],
    CREDENTIAL['port'],
  );

  if ($mysqli->connect_errno) {
    throw new ConnectionException("Conexion Fallida: {$mysqli->connect_error}");
  }

  $setnames = $mysqli->prepare("SET NAMES 'utf8'");
  $setnames->execute();

  var_dump($setnames);

  $setnames->close();
  $mysqli->close();
} catch (ConnectionException $e) {
  echo "Error de Conexión: " . $e->getMessage();
} catch (Exception $e) {
  echo "Error General: " . $e->getMessage();
}

// Forma Procedural
//$mysqli = mysqli_connect($host, $username, $password, $database);

// Comprobar Conexion Forma Procedural
/*if (!$mysqli) {
	die('Conexion Fallida: Error: ' . mysqli_connect_error());
}*/

// Forma Orientada a Objetos
/*$mysqli = new mysqli($host, $username, $password, $database);

// Comprobar Conexion Forma Orientada a Objetos
if ($mysqli->connect_errno) {
  die("Conexion Fallida: {$mysqli->connect_error}");
}

// Utilizar caracteres en consultas queries
$setnames = $mysqli->prepare("SET NAMES 'utf8'");
$setnames->execute();

var_dump($setnames);*/