<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/data/delete.php
*/
include './../../dao/Mysql.php';
include './../../dao/DataDao.php';
$_entity = new DataDao();
if(isset($_POST['data_id'])){
$data_id = $_POST['data_id'];
$_entity->delete($data_id);

echo json_encode(["Success"]);
} else {
echo json_encode([null]);
}
?>
            
