<?php

namespace App\Controllers\Examples;

use Database\MySQLi\Connection;

class ExQueryMySQLiController
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
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?,
       ?
      );
    "
    );

    $ab_by_created = $data['ab_by_created'];
    $ab_by_modified = $data['ab_by_modified'];
    $ab_date_created = $data['ab_date_created'];
    $ab_date_modified = $data['ab_date_modified'];
    $ab_deleted = $data['ab_deleted'];
    $ab_description = $data['ab_description'];
    $ab_import = $data['ab_import'];
    $ab_level = $data['ab_level'];
    $ab_record = $data['ab_record'];
    $ab_status = $data['ab_status'];
    $ab_temp = $data['ab_temp'];
    $ac_name = $data['ac_name'];

    $stmt->bind_param(
      "ssssssssssss",
      $ab_by_created,
      $ab_by_modified,
      $ab_date_created,
      $ab_date_modified,
      $ab_deleted,
      $ab_description,
      $ab_import,
      $ab_level,
      $ab_record,
      $ab_status,
      $ab_temp,
      $ac_name,
    );

    $stmt->execute();

    echo 'MySQLi: Filas ' . $stmt->affected_rows . ' insertadas en la base de datos';
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