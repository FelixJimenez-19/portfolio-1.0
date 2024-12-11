<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/certificate/insert.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/CertificateDao.php';
$_entity = new CertificateDao();
if (isset($_POST['certificate_descripcion']) and isset($_POST['certificate_estado']) and isset($_POST['usuario_id'])) {
    $certificate_descripcion = $_POST['certificate_descripcion'];
    $certificate_estado = $_POST['certificate_estado'];
    $usuario_id = $_POST['usuario_id'];
    $_entity->insert($certificate_descripcion, $certificate_estado, $usuario_id);

    if (isset($_FILES['certificate_file'])) {
        $certificate_file = $_FILES['certificate_file'];
        if ($certificate_file['tmp_name'] != "" or $certificate_file['tmp_name'] != null) {
            if (!file_exists('../../../view/src/files/certificate_file')) {
                mkdir('../../../view/src/files/certificate_file', 0700);
            }
            $certificate_id = mysqli_fetch_assoc($_entity->selectByAll($certificate_descripcion, $certificate_estado, $usuario_id))['certificate_id'];

            $desde = $certificate_file['tmp_name'];
            $hasta = "../../../view/src/files/certificate_file/" . $certificate_id . ".png";
            copy($desde, $hasta);
            $_entity->updatecertificate_imagen($certificate_id . ".png", $certificate_id);
        }
    }

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
