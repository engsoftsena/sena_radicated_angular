<?php
require('TimeZone.php');
require('Credential.php');
define('ROOT', 'enginelocals/adisonzenemij/github/angular/sena/project/src/app/backend/public/');

# Constantes fundamentales
if (isset($_SERVER['HTTPS'])) {
  define('server', 'https');
} else {
  define('server', 'http');
}
define('URL', server . '://' . $_SERVER['HTTP_HOST'] . '/' . ROOT);
define('APP', 'APP PQRS');
