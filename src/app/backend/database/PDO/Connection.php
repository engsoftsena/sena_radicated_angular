<?php

namespace Database\PDO;

use Exception;
use PDO;
use PDOException;

class Connection
{
  private static $instance;
  private $connection;

  private function __construct()
  {
    $this->makeConnection();
  }

  public static function getInstance()
  {
    if (!self::$instance instanceof self) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  public function getDatabaseInstance()
  {
    return $this->connection;
  }

  private function createPDOConnection()
  {
    $host = CREDENTIAL['host'];
    $port = CREDENTIAL['port'];
    $base = CREDENTIAL['base'];
    $user = CREDENTIAL['user'];
    $pass = CREDENTIAL['pass'];

    $dsn = "mysql:host=$host;port=$port;dbname=$base";
    $options = [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"
    ];

    return new PDO($dsn, $user, $pass, $options);
  }

  private function setConnectionCharset(PDO $connection): void
  {
    $setnames = $connection->prepare("SET NAMES 'utf8'");
    $setnames->execute();
  }

  private function makeConnection(): void
  {
    try {
      $connection = $this->createPDOConnection();
      $this->setConnectionCharset($connection);
    } catch (PDOException $e) {
      echo "Error de Conexión: " . $e->getMessage();
    } catch (Exception $e) {
      echo "Error General: " . $e->getMessage();
    } finally {
      $connection = null;
    }
  }
}
