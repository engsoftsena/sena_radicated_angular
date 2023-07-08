<?php

namespace App\Controllers\Examples;

use Database\PDO\Connection;

class ExQueryPDOController
{
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
    $connection = Connection::getInstance()->getDatabaseInstance();
    $stmt = $connection->prepare(
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



    $stmt->bindParam(':ab_by_created', $data['ab_by_created']);
    $stmt->bindParam(':ab_by_modified', $data['ab_by_modified']);
    $stmt->bindParam(':ab_date_created', $data['ab_date_created']);
    $stmt->bindParam(':ab_date_modified', $data['ab_date_modified']);
    $stmt->bindParam(':ab_deleted', $data['ab_deleted']);
    $stmt->bindParam(':ab_description', $data['ab_description']);
    $stmt->bindParam(':ab_import', $data['ab_import']);
    $stmt->bindParam(':ab_level', $data['ab_level']);
    $stmt->bindParam(':ab_record', $data['ab_record']);
    $stmt->bindParam(':ab_status', $data['ab_status']);
    $stmt->bindParam(':ab_temp', $data['ab_temp']);
    $stmt->bindParam(':ac_name', $data['ac_name']);

    $stmt->execute($data);

    //echo 'PDO: Filas ' . $stmt->affected_rows . ' insertadas en la base de datos';
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