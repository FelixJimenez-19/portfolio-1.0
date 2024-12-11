
<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/certificate/delete.php
*/
include './../../dao/Mysql.php';
include './../../dao/CertificateDao.php';
$_entity = new CertificateDao();
if(isset($_POST['certificate_id'])){
$certificate_id = $_POST['certificate_id'];
$_entity->delete($certificate_id);

echo json_encode(["Success"]);
} else {
echo json_encode([null]);
}
?>
      