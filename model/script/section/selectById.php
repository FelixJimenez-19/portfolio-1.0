<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/section/selectById.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/SectionDao.php';
$_entity = new SectionDao();
if (isset($_POST['section_id'])) {
    $section_id = $_POST['section_id'];
    $rs = $_entity->selectById($section_id);
    $array = array();
    while ($r = mysqli_fetch_assoc($rs)) {
        $array[] = $r;
    }
    echo json_encode($array);
} else {
    echo json_encode([null]);
}