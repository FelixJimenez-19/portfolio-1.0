<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/section/delete.php
*/
include './../../dao/Mysql.php';
include './../../dao/SectionDao.php';
$_entity = new SectionDao();
if (isset($_POST['section_id'])) {
    $section_id = $_POST['section_id'];
    $_entity->delete($section_id);

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
