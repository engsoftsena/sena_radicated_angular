<?php

require('../vendor/autoload.php');

$slug = $_GET['slug'] ?? '';
$slug = explode('/', $slug);

//echo '<pre>';
//var_dump($slug);
//echo '</pre>';

$resource = $slug[0] == '' ? '/' : $slug[0];
$id = $slug[1] ?? null;

switch ($resource) {
  case '/':
    echo 'Ruta Raiz';
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
