<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/componente/delete.php
*/
include './../../dao/Mysql.php';
include './../../dao/ComponenteDao.php';
$_entity = new ComponenteDao();
if (isset($_POST['componente_id'])) {
    $componente_id = $_POST['componente_id'];
    $_entity->delete($componente_id);

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
