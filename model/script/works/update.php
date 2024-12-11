<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/works/update.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/WorksDao.php';
$_entity = new WorksDao();
if (isset($_POST['works_nombre']) and isset($_POST['works_descripcion']) and isset($_POST['works_link']) and isset($_POST['usuario_id']) and  isset($_POST['works_id'])) {
    $works_nombre = $_POST['works_nombre'];
    $works_descripcion = $_POST['works_descripcion'];
    $works_link = $_POST['works_link'];
    $usuario_id = $_POST['usuario_id'];
    $works_id = $_POST['works_id'];
    $_entity->update($works_nombre, $works_descripcion, $works_link, $usuario_id, $works_id);

    if (isset($_FILES['works_imagen'])) {
        $works_imagen = $_FILES['works_imagen'];
        if ($works_imagen['tmp_name'] != "" or $works_imagen['tmp_name'] != null) {
            if (!file_exists('../../../view/src/files/works_imagen')) {
                mkdir("../../../view/src/files/works_imagen", 0700);
            }

            $desde = $works_imagen['tmp_name'];
            $hasta = "../../../view/src/files/works_imagen/" . $works_id . ".png";
            copy($desde, $hasta);
            $_entity->updateWorks_imagen($works_id . ".png", $works_id);
        }
    }

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
