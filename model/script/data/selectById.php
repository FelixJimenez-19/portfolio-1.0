

<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/data/selectById.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/DataDao.php';
$_entity = new DataDao();
if (isset($_POST['data_id'])) {
$data_id = $_POST['data_id'];
$rs = $_entity->selectById($data_id);
$array = array();
while($r = mysqli_fetch_assoc($rs)) {
$array[] = $r;
}
echo json_encode($array);
} else {
echo json_encode([null]);
}
?>
     