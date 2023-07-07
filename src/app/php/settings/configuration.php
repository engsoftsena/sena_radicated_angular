<?php
# Timezone DOC http://php.net/manual/es/timezones.php
date_default_timezone_set('America/Bogota');

require('credential.php');
require('connection.php');
require('dateHour.php');

# Definir la carpeta de ubicacion del framework
define('ROOT', '/enginelocals/adisonzenemij/github/ocrend/staff/medimple/');

# Constantes fundamentales
if (isset($_SERVER['HTTPS'])) {
  define('SERVER', 'https');
} else {
  define('SERVER', 'http');
}
define('URL', SERVER . '://' . $_SERVER['HTTP_HOST'] . ROOT);
define('APP', 'Medimple CRM');
define('APS', 'MI');
