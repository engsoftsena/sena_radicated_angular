<?php

namespace App\Controllers\Examples;

use PDO;
use Database\PDO\Connection;

class ExQueryPDOController
{
  private $connection;

  public function __construct()
  {
    $this->connection = Connection::getInstance()->getDatabaseInstance();;
  }

  /**
   * Visualizar una lista del recurso
   */
  public function column()
  {
    $stmt = $this->connection->prepare("
      SELECT aa_identifier, ac_name
      FROM tg_role_data
    ");
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_COLUMN, 1);

    echo '<b>HTML: $results = $stmt->fetchAll(PDO::FETCH_COLUMN, number);</b>';
    echo '<br>';

    echo '<pre>';
    var_dump($results);
    echo '</pre>';

    echo '<b>HTML: foreach ($results as $result) {}</b>';
    echo '<br>';

    echo '<pre>';
    foreach ($results as $result) {
      var_dump($result);
    }
    echo '</pre>';
  }

  /**
   * Visualizar un formulario para crear un nuevo recurso
   */
  public function create()
  {
    require('../resources/views/exquerypdo/create.php');
  }

  /**
   * Eliminar un recurso especifico de la base de datos
   */
  public function destroy($id)
  {
    //$this->connection->beginTransaction();
    $stmt = $this->connection->prepare("
      DELETE FROM tg_role_data
      WHERE aa_identifier = :id
    ");
    $stmt->execute([
      ':id' => $id
    ]);
    /*$sure = readLine('Confirmar Eliminacion del Registro: [no,si]');
    if ($sure == 'no') {
      // Revertir Transaccion
      $this->connection->rollBack();
    }

    if ($sure == 'si') {
      // Completar Transaccion
      $this->connection->commit();
    }*/
  }

  /**
   * Visualizar el formulario para editar un recurso
   */
  public function edit()
  {
  }

  /**
   * Visualizar una lista del recurso
   */
  public function index()
  {
    $stmt = $this->connection->prepare("
      SELECT * FROM tg_role_data
    ");
    $stmt->execute();

    /*echo '<b>HTML: while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {}</b>';
    echo '<br>';

    echo '<pre>';
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      var_dump($row);
    }
    echo '</pre>';*/

    /*echo '<b>HTML: while ($stmt->fetch(PDO::FETCH_ASSOC)) {}</b>';
    echo '<br>';

    $stmt->bindColumn('aa_identifier', $aa_identifier);
    $stmt->bindColumn('ac_name', $ac_name);

    echo '<pre>';
    while ($stmt->fetch(PDO::FETCH_ASSOC)) {
      echo $aa_identifier . ':' . $ac_name . '<br>';
    }
    echo '</pre>';*/

    /*echo '<b>HTML: foreach ($results as $result) {}</b>';
    echo '<br>';*/

    $results = $stmt->fetchAll();

    require('../resources/views/exquerypdo/index.php');

    /*echo '<pre>';
    foreach ($results as $result) {
      var_dump($result);
    }
    echo '</pre>';*/
  }

  /**
   * Visualizar un unico recurso especificado
   */
  public function show($id)
  {
    $stmt = $this->connection->prepare("
      SELECT * FROM tg_role_data
      WHERE aa_identifier = :id
    ");
    $stmt->execute([
      ':id' => $id
    ]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo '<b>HTML: $result = $stmt->fetch(PDO::FETCH_ASSOC);</b>';
    echo '<br>';

    echo '<pre>';
    var_dump($result);
    echo '</pre>';
  }

  /**
   * Guardar un nuevo recurso en la base de datos
   */
  public function store($data)
  {
    $stmt = $this->connection->prepare("
      INSERT INTO tg_role_data (
        ab_by_created,
        ab_by_modified,
        ab_date_created,
        ab_date_modified,
        ab_deleted,
        ab_description,
        ab_import,
        ab_level,
        ab_record,
        ab_status,
        ab_temp,
        ac_name
      ) VALUES (
        :ab_by_created,
        :ab_by_modified,
        :ab_date_created,
        :ab_date_modified,
        :ab_deleted,
        :ab_description,
        :ab_import,
        :ab_level,
        :ab_record,
        :ab_status,
        :ab_temp,
        :ac_name
      );
    ");

    $stmt->bindValue(':ab_by_created', $data['ab_by_created']);
    $stmt->bindValue(':ab_by_modified', $data['ab_by_modified']);
    $stmt->bindValue(':ab_date_created', $data['ab_date_created']);
    $stmt->bindValue(':ab_date_modified', $data['ab_date_modified']);
    $stmt->bindValue(':ab_deleted', $data['ab_deleted']);
    $stmt->bindValue(':ab_description', $data['ab_description']);
    $stmt->bindValue(':ab_import', $data['ab_import']);
    $stmt->bindValue(':ab_level', $data['ab_level']);
    $stmt->bindValue(':ab_record', $data['ab_record']);
    $stmt->bindValue(':ab_status', $data['ab_status']);
    $stmt->bindValue(':ab_temp', $data['ab_temp']);
    $stmt->bindValue(':ac_name', $data['ac_name']);

    $stmt->execute();
    header('location: ' . URL . 'exquerypdo');
  }

  /**
   * Actualizar un recurso especifico en la base de datos
   */
  public function update($data)
  {
    $stmt = $this->connection->prepare("
      UPDATE tg_role_data SET
        ab_by_modified = :ab_by_modified,
        ab_date_modified = :ab_date_modified,
        ab_description = :ab_description,
        ab_status = :ab_status,
        ac_name = :ac_name
      WHERE aa_identifier = :aa_identifier
    ");

    $stmt->execute([
      ':aa_identifier' => $data['aa_identifier'],
      ':ab_by_modified' => $data['ab_by_modified'],
      ':ab_date_modified' => $data['ab_date_modified'],
      ':ab_description' => $data['ab_description'],
      ':ab_status' => $data['ab_status'],
      ':ac_name' => $data['ac_name'],
    ]);
  }

  /**
   * Actualizar un recurso especifico en la base de datos
   */
  public function updateId($data, $id)
  {
    $stmt = $this->connection->prepare("
      UPDATE tg_role_data SET
        ab_by_modified = :ab_by_modified,
        ab_date_modified = :ab_date_modified,
        ab_description = :ab_description,
        ab_status = :ab_status,
        ac_name = :ac_name
      WHERE aa_identifier = :aa_identifier
    ");

    $stmt->execute([
      'aa_identifier' => $id,
      'ab_by_modified' => $data['ab_by_modified'],
      'ab_date_modified' => $data['ab_date_modified'],
      'ab_description' => $data['ab_description'],
      'ab_status' => $data['ab_status'],
      'ac_name' => $data['ac_name'],
    ]);
  }
}

/*

index: Display a listing of the resource
create: Show the form for creating a new resource
store: Store a newly created resource in storage
show: Display the specified resource
edit: Show the form for editing the specified resource
update: Update the specified resourfce in storage
destroy: Remove the specified resource from storage

*/
