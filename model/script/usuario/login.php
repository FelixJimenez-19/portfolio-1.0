<?php

session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/UsuarioDao.php';
$_entity = new UsuarioDao();
if (isset($_POST['usuario_email']) and isset($_POST['usuario_pass'])) {
    $usuario_email = $_POST['usuario_email'];
    $usuario_pass = $_POST['usuario_pass'];
    $rs = mysqli_fetch_assoc($_entity->login($usuario_email, $usuario_pass));
    if ($rs['usuario_email'] == $usuario_email and $rs['usuario_pass'] == $usuario_pass) {
        $_SESSION['usuario_id'] = $rs['usuario_id'];
        $_SESSION['usuario_nombre'] = $rs['usuario_nombre'];
        $_SESSION['usuario_profesion'] = $rs['usuario_profesion'];
        $_SESSION['usuario_email'] = $rs['usuario_email'];
        $_SESSION['usuario_pass'] = $rs['usuario_pass'];
        $_SESSION['usuario_descripcion'] = $rs['usuario_descripcion'];
        $_SESSION['usuario_experiencia'] = $rs['usuario_experiencia'];
        $_SESSION['usuario_proyectos'] = $rs['usuario_proyectos'];
        $_SESSION['usuario_segundos'] = $rs['usuario_segundos'];
        $_SESSION['usuario_authorize'] = $rs['usuario_authorize'];
        $_SESSION['usuario_foto'] = $rs['usuario_foto'];
        $_SESSION['usuario_logo'] = $rs['usuario_logo'];
        $_SESSION['usuario_portada1'] = $rs['usuario_portada1'];
        $_SESSION['usuario_portada2'] = $rs['usuario_portada2'];
        $_SESSION['usuario_curriculum'] = $rs['usuario_curriculum'];
        echo json_encode($rs);
    } else {
        echo json_encode([null]);
    }
} else {
    echo json_encode([null]);
}
