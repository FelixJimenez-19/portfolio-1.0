<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/skills/selectById.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/SkillsDao.php';
$_entity = new SkillsDao();
if (isset($_POST['skills_id'])) {
    $skills_id = $_POST['skills_id'];
    $rs = $_entity->selectById($skills_id);
    $array = array();
    while ($r = mysqli_fetch_assoc($rs)) {
        $array[] = $r;
    }
    echo json_encode($array);
} else {
    echo json_encode([null]);
}
