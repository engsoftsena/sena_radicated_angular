<?php

require_once('../setting/Configuration.php');
require('../vendor/autoload.php');

use App\Controllers\Examples\ExQueryMySQLiController;
use App\Controllers\Examples\ExQueryPDOController;
use Router\RouterHandler;

$slug = $_GET['slug'] ?? '';
$slug = explode('/', $slug);

//echo '<pre>';
//var_dump($slug);
//echo '</pre>';

$resource = $slug[0] == '' ? '/' : $slug[0];
$id = $slug[1] ?? null;

// Instancia del Router
$router = new RouterHandler();

switch ($resource) {
  case '/':
    echo 'Ruta Raiz';
    break;
  case 'exquerymysqli':
    $method = $_POST['method'] ?? 'get';
    $router->setMethod($method);
    $router->setData($_POST);
    $router->route(ExQueryMySQLiController::class, $id);
    break;
  case 'exquerypdo':
    $method = $_POST['method'] ?? 'get';
    $router->setMethod($method);
    $router->setData($_POST);
    $router->route(ExQueryPDOController::class, $id);
    break;
  case 'tgroledata':
    echo 'Ruta tgroledata';
    break;
  case 'tguserdata':
    echo 'Ruta tguserdata';
    break;
  default:
    echo '404 Not Found';
    break;
}
