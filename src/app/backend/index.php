<?php

require_once('setting/TimeZone.php');
require_once('setting/Credential.php');

//use App\Controllers\TgRoleDataController;
//use App\Controllers\TgUserDataController;

use App\Controllers\Examples\ExQueryMySQLiController;
use App\Controllers\Examples\ExQueryPDOController;

require('vendor/autoload.php');

/*$exQueryMySQLiController = new ExQueryMySQLiController();
$exQueryMySQLiController->store([
  //'aa_identifier' => '',
  'ab_by_created' => '1',
  'ab_by_modified' => '1',
  'ab_date_created' => DATE_HOUR,
  'ab_date_modified' => DATE_HOUR,
  'ab_deleted' => '1',
  'ab_description' => '',
  'ab_import' => '1',
  'ab_level' => '1',
  'ab_record' => '1',
  'ab_status' => '1',
  'ab_temp' => '1',
  'ac_name' => 'Desarrollador',
]);*/

$exQueryPDOController = new ExQueryPDOController();

echo '<h2>HTML: $exQueryPDOController->index();</h2>';
$exQueryPDOController->index();
echo '<hr>';

echo '<h2>HTML: $exQueryPDOController->column();</h2>';
$exQueryPDOController->column();
echo '<hr>';

echo '<h2>HTML: $exQueryPDOController->show();</h2>';
$exQueryPDOController->show(1);
echo '<hr>';

/*$exQueryPDOController->store([
  //'aa_identifier' => '',
  'ab_by_created' => '1',
  'ab_by_modified' => '1',
  'ab_date_created' => DATE_HOUR,
  'ab_date_modified' => DATE_HOUR,
  'ab_deleted' => '1',
  'ab_description' => '',
  'ab_import' => '1',
  'ab_level' => '1',
  'ab_record' => '1',
  'ab_status' => '1',
  'ab_temp' => '1',
  'ac_name' => 'Desarrollador',
]);*/

/*$tgRoleDataController = new TgRoleDataController();
$tgRoleDataController->store([
  //'aa_identifier' => '',
  'ab_by_created' => '1',
  'ab_by_modified' => '1',
  'ab_date_created' => DATE_HOUR,
  'ab_date_modified' => DATE_HOUR,
  'ab_deleted' => '1',
  'ab_description' => '',
  'ab_import' => '1',
  'ab_level' => '1',
  'ab_record' => '1',
  'ab_status' => '1',
  'ab_temp' => '1',
  'ac_name' => 'Desarrollador',
]);*/

/*$tgUserDataController = new TgUserDataController();
$tgUserDataController->store([
  //'aa_identifier' => '',
  'ab_by_created' => '1',
  'ab_by_modified' => '1',
  'ab_date_created' => DATE_HOUR,
  'ab_date_modified' => DATE_HOUR,
  'ab_deleted' => '1',
  'ab_description' => '',
  'ab_import' => '1',
  'ab_level' => '1',
  'ab_record' => '1',
  'ab_status' => '1',
  'ab_temp' => '1',
  'ac_email' => 'devp@gmail.com',
  'ac_login' => 'devp',
  'ac_password' => md5('Test$$2023'),
  'tg_role_data' => '1',
]);*/