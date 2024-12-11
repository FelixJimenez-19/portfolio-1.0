<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/skills/delete.php
*/
include './../../dao/Mysql.php';
include './../../dao/SkillsDao.php';
$_entity = new SkillsDao();
if (isset($_POST['skills_id'])) {
    $skills_id = $_POST['skills_id'];
    $_entity->delete($skills_id);

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
