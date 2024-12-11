<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/usuario/updateSegundos.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/UsuarioDao.php';
$_entity = new UsuarioDao();
if (isset($_POST['usuario_segundos']) and  isset($_POST['usuario_id'])) {
    $usuario_segundos = $_POST['usuario_segundos'];
    $usuario_id = $_POST['usuario_id'];
    $_entity->updateSegundos($usuario_segundos, $usuario_id);
    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
