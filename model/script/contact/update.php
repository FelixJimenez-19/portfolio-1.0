<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/contact/update.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/ContactDao.php';
$_entity = new ContactDao();
if (isset($_POST['contact_nombre']) and isset($_POST['contact_url']) and isset($_POST['contact_icon']) and isset($_POST['usuario_id']) and  isset($_POST['contact_id'])) {
    $contact_nombre = $_POST['contact_nombre'];
    $contact_url = $_POST['contact_url'];
    $contact_icon = $_POST['contact_icon'];
    $usuario_id = $_POST['usuario_id'];
    $contact_id = $_POST['contact_id'];
    $_entity->update($contact_nombre, $contact_url, $contact_icon, $usuario_id, $contact_id);

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
