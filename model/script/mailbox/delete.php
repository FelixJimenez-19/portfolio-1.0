<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/mailbox/delete.php
*/
include './../../dao/Mysql.php';
include './../../dao/MailboxDao.php';
$_entity = new MailboxDao();
if (isset($_POST['mailbox_id'])) {
    $mailbox_id = $_POST['mailbox_id'];
    $_entity->delete($mailbox_id);

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
