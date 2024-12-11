
<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/DataDao.php';
$_entity = new DataDao();
if (isset($_POST['data_titulo']) and isset($_POST['data_detalle']) and isset($_POST['section_id']) and isset($_POST['data_fecha']) ) {
$data_titulo = $_POST['data_titulo']; 
$data_detalle = $_POST['data_detalle']; 
$section_id = $_POST['section_id'];
$data_fecha = $_POST['data_fecha']; 
$_entity->insert($data_titulo, $data_detalle,$section_id, $data_fecha);

echo json_encode(["Success"]);
} else {
echo json_encode([null]);
}
?>