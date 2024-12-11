<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/componente/insert.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/ComponenteDao.php';
$_entity = new ComponenteDao();
if (isset($_POST['componente_nombre']) and isset($_POST['componente_prioridad']) and isset($_POST['componente_archivo']) and isset($_POST['usuario_id'])) {
    $componente_nombre = $_POST['componente_nombre'];
    $componente_prioridad = $_POST['componente_prioridad'];
    $componente_archivo = $_POST['componente_archivo'];
    $usuario_id = $_POST['usuario_id'];
    $_entity->insert($componente_nombre, $componente_prioridad, $componente_archivo, $usuario_id);

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
