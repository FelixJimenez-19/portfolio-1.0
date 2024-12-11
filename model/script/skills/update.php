<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/skills/update.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/SkillsDao.php';
$_entity = new SkillsDao();
if (isset($_POST['skills_nombre']) and isset($_POST['skills_porcentaje']) and isset($_POST['usuario_id']) and  isset($_POST['skills_id'])) {
    $skills_nombre = $_POST['skills_nombre'];
    $skills_porcentaje = $_POST['skills_porcentaje'];
    $usuario_id = $_POST['usuario_id'];
    $skills_id = $_POST['skills_id'];
    $_entity->update($skills_nombre, $skills_porcentaje, $usuario_id, $skills_id);

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
