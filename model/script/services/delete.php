<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/services/delete.php
*/
include './../../dao/Mysql.php';
include './../../dao/ServicesDao.php';
$_entity = new ServicesDao();
if (isset($_POST['services_id'])) {
    $services_id = $_POST['services_id'];
    $_entity->delete($services_id);

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
