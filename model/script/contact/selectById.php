<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/contact/selectById.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/ContactDao.php';
$_entity = new ContactDao();
if (isset($_POST['contact_id'])) {
    $contact_id = $_POST['contact_id'];
    $rs = $_entity->selectById($contact_id);
    $array = array();
    while ($r = mysqli_fetch_assoc($rs)) {
        $array[] = $r;
    }
    echo json_encode($array);
} else {
    echo json_encode([null]);
}