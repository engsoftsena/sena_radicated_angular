<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <h1>Ruta Nuevo Registro</h1>
  <form action="<?= URL; ?>exquerypdo/create" method="post">
    <label for="ab_by_created">
      <span>ab_by_created</span>
    </label>
    <input type="number" name="ab_by_created" id="ab_by_created" value="1">

    <br>

    <label for="ab_by_modified">
      <span>ab_by_modified</span>
    </label>
    <input type="number" name="ab_by_modified" id="ab_by_modified" value="1">

    <br>

    <label for="ab_date_created">
      <span>ab_date_created</span>
    </label>
    <input type="text" name="ab_date_created" id="ab_date_created" value="<?= DATE_HOUR; ?>">

    <br>

    <label for="ab_date_modified">
      <span>ab_date_modified</span>
    </label>
    <input type="text" name="ab_date_modified" id="ab_date_modified" value="<?= DATE_HOUR; ?>">

    <br>

    <label for="ab_deleted">
      <span>ab_deleted</span>
    </label>
    <input type="number" name="ab_deleted" id="ab_deleted" value="1">

    <br>

    <label for="ab_description">
      <span>ab_description</span>
    </label>
    <input type="text" name="ab_description" id="ab_description">

    <br>

    <label for="ab_import">
      <span>ab_import</span>
    </label>
    <input type="number" name="ab_import" id="ab_import" value="1">

    <br>

    <label for="ab_level">
      <span>ab_level</span>
    </label>
    <input type="number" name="ab_level" id="ab_level" value="1">

    <br>

    <label for="ab_record">
      <span>ab_record</span>
    </label>
    <input type="number" name="ab_record" id="ab_record" value="1">

    <br>

    <label for="ab_status">
      <span>ab_status</span>
    </label>
    <input type="number" name="ab_status" id="ab_status" value="1">

    <br>

    <label for="ab_temp">
      <span>ab_temp</span>
    </label>
    <input type="number" name="ab_temp" id="ab_temp" value="1">

    <br>

    <label for="ac_name">
      <span>ac_name</span>
    </label>
    <input type="text" name="ac_name" id="ac_name">

    <br>

    <input type="hidden" name="method" value="post">

    <button type="submit">
      <span>Guardar</span>
    </button>

  </form>
</body>

</html>