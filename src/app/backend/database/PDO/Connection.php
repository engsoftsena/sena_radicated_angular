<?php
//require('../../setting/Credential.php');

try {
  $host = CREDENTIAL['host'];
  $port = CREDENTIAL['port'];
  $database = CREDENTIAL['base'];

  $dsn = "mysql:host=$host;port=$port;dbname=$database";
  $connection = new PDO($dsn, CREDENTIAL['user'], CREDENTIAL['pass']);

  $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $connection->exec("SET NAMES 'utf8'");

  $setnames = $connection->prepare("SET NAMES 'utf8'");
  $setnames->execute();

  var_dump($setnames);
} catch (PDOException $e) {
  echo "Error de Conexión: " . $e->getMessage();
} catch (Exception $e) {
  echo "Error General: " . $e->getMessage();
} finally {
  // Acciones a realizar después del bloque try-catch, se ejecutarán siempre
  // Independientemente de si se lanzó una excepción o no.
  // Esto podría incluir cierre de conexiones, liberación de recursos, etc.
  $connection = null;
}
