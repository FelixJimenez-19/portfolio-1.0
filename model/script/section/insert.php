<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/contact/insert.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/SectionDao.php';
$_entity = new SectionDao();
if (isset($_POST['section_titulo']) and isset($_POST['section_prioridad']) and isset($_POST['usuario_id'])) {
    $section_titulo = $_POST['section_titulo'];
    $section_prioridad = $_POST['section_prioridad'];
    $usuario_id = $_POST['usuario_id'];
    $_entity->insert($section_titulo, $section_prioridad,$usuario_id);

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
