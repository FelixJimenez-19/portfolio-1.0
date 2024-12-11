<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/services/insert.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/ServicesDao.php';
$_entity = new ServicesDao();
if (isset($_POST['services_nombre']) and isset($_POST['services_descripcion']) and isset($_POST['usuario_id'])) {
    $services_nombre = $_POST['services_nombre'];
    $services_descripcion = $_POST['services_descripcion'];
    $usuario_id = $_POST['usuario_id'];
    $_entity->insert($services_nombre, $services_descripcion, $usuario_id);

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
