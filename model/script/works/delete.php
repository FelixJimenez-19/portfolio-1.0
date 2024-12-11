<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/works/delete.php
*/
include './../../dao/Mysql.php';
include './../../dao/WorksDao.php';
$_entity = new WorksDao();
if (isset($_POST['works_id'])) {
    $works_id = $_POST['works_id'];
    $_entity->delete($works_id);

    if (file_exists("../../../view/src/files/works_imagen/" . $works_id . ".png")) {
        unlink("../../../view/src/files/works_imagen/" . $works_id . ".png");
    }

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
