<?php

namespace Database\MySQLi;

use Exception;
use mysqli;

class ConnectionException extends Exception
{
  public function __construct(
    string $message = "",
    int $code = 0,
    \Throwable $previous = null
  ) {
    parent::__construct($message, $code, $previous);
  }
}

class Connection
{
  private static $instance;
  private $connection;

  private function __construct()
  {
    $this->makeConnection();
  }

  public  static function getInstance()
  {
    // Si no es una instancia de la misma clase que si lo sea
    if (!self::$instance instanceof self) {
      // Igualar a uneva nueva instancia de la misma clase
      self::$instance = new self();
    }
    return self::$instance;
  }

  public function getDatabaseInstance()
  {
    return $this->connection;
  }

  private function makeConnection()
  {
    try {
      $mysqli = $this->createMySQLiConnection();

      $this->checkConnectionError($mysqli);

      $this->setConnectionCharset($mysqli);

      $this->connection = $mysqli;
    } catch (ConnectionException $e) {
      echo "Error de Conexión: " . $e->getMessage();
    } catch (Exception $e) {
      echo "Error General: " . $e->getMessage();
    }
  }

  private function createMySQLiConnection()
  {
    return new mysqli(
      CREDENTIAL['host'],
      CREDENTIAL['user'],
      CREDENTIAL['pass'],
      CREDENTIAL['base'],
      CREDENTIAL['port']
    );
  }

  private function checkConnectionError(mysqli $mysqli)
  {
    if ($mysqli->connect_errno) {
      throw new ConnectionException("Conexion Fallida: {$mysqli->connect_error}");
    }
  }

  private function setConnectionCharset(mysqli $mysqli)
  {
    $setnames = $mysqli->prepare("SET NAMES 'utf8'");
    $setnames->execute();
    $setnames->close();
  }
}
