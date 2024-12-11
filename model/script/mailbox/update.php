<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/mailbox/update.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/MailboxDao.php';
$_entity = new MailboxDao();
if (isset($_POST['mailbox_nombre']) and isset($_POST['mailbox_email']) and isset($_POST['mailbox_mensaje']) and isset($_POST['usuario_id']) and  isset($_POST['mailbox_id'])) {
    $mailbox_nombre = $_POST['mailbox_nombre'];
    $mailbox_email = $_POST['mailbox_email'];
    $mailbox_mensaje = $_POST['mailbox_mensaje'];
    $usuario_id = $_POST['usuario_id'];
    $mailbox_id = $_POST['mailbox_id'];
    $_entity->update($mailbox_nombre, $mailbox_email, $mailbox_mensaje, $usuario_id, $mailbox_id);

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
