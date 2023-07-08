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
  public function index()
  {
    $stmt = $this->connection->prepare("SELECT * FROM tg_role_data");
    $stmt->execute();

    $results = $stmt->fetchAll();

    foreach ($results as $result) {
      var_dump($result);
    }
  }

  /**
   * Visualizar una lista del recurso
   */
  public function column()
  {
    $stmt = $this->connection->prepare("SELECT aa_identifier, ac_name FROM tg_role_data");
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

    var_dump($results);

    foreach ($results as $result) {
      var_dump($result);
    }
  }

  /**
   * Visualizar un formulario para crear un nuevo recurso
   */
  public function create()
  {
  }

  /**
   * Guardar un nuevo recurso en la base de datos
   */
  public function store($data)
  {
    $stmt = $this->connection->prepare(
      "INSERT INTO tg_role_data (
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
      "
    );

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

    $stmt->execute($data);
  }

  /**
   * Visualizar un unico recurso especificado
   */
  public function show()
  {
  }

  /**
   * Visualizar el formulario para editar un recurso
   */
  public function edit()
  {
  }

  /**
   * Actualizar un recurso especifico en la base de datos
   */
  public function update()
  {
  }

  /**
   * Eliminar un recurso especifico de la base de datos
   */
  public function destroy()
  {
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
