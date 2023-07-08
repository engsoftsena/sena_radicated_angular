<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <h1>Modulo ExQueryPDO</h1>
  <table border="1">
    <thead>
      <tr>
        <td>Identificador</td>
        <td>Nombre</td>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($results as $result) : ?>
        <tr>
          <td><?= $result['aa_identifier']; ?></td>
          <td><?= $result['ac_name']; ?></td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
</body>

</html>