<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/contact/delete.php
*/
include './../../dao/Mysql.php';
include './../../dao/ContactDao.php';
$_entity = new ContactDao();
if (isset($_POST['contact_id'])) {
    $contact_id = $_POST['contact_id'];
    $_entity->delete($contact_id);

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
