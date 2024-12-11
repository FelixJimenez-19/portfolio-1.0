<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/contact/update.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/SectionDao.php';
$_entity = new SectionDao();
if (isset($_POST['section_titulo']) and isset($_POST['section_prioridad']) and isset($_POST['usuario_id']) and  isset($_POST['section_id'])) {
    $section_titulo = $_POST['section_titulo'];
    $section_prioridad = $_POST['section_prioridad'];
    $usuario_id = $_POST['usuario_id'];
    $section_id = $_POST['section_id'];
    $_entity->update($section_titulo, $section_prioridad,$usuario_id, $section_id);

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
