<?php
/*
_____________________________________________________________________________________________
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/script/usuario/update.php
*/
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
include './../../dao/Mysql.php';
include './../../dao/UsuarioDao.php';
$_entity = new UsuarioDao();
if (isset($_POST['usuario_nombre']) and isset($_POST['usuario_profesion']) and isset($_POST['usuario_email']) and isset($_POST['usuario_pass']) and isset($_POST['usuario_descripcion']) and isset($_POST['usuario_experiencia']) and isset($_POST['usuario_proyectos']) and isset($_POST['usuario_segundos']) and isset($_POST['usuario_authorize'])and isset($_POST['usuario_nacimiento']) and isset($_POST['usuario_direccion']) and isset($_POST['usuario_celular']) and isset($_POST['usuario_cuidad']) and isset($_POST['usuario_estado_civil']) and isset($_POST['usuario_cedula']) and  isset($_POST['usuario_id']) ) {
    $usuario_nombre = $_POST['usuario_nombre'];
    $usuario_profesion = $_POST['usuario_profesion'];
    $usuario_email = $_POST['usuario_email'];
    $usuario_pass = $_POST['usuario_pass'];
    $usuario_descripcion = $_POST['usuario_descripcion'];
    $usuario_experiencia = $_POST['usuario_experiencia'];
    $usuario_proyectos = $_POST['usuario_proyectos'];
    $usuario_segundos = $_POST['usuario_segundos'];
    $usuario_authorize = $_POST['usuario_authorize'];
    $usuario_nacimiento =$_POST['usuario_nacimiento'];
    $usuario_direccion=$_POST['usuario_direccion'];
    $usuario_celular=$_POST['usuario_celular'];
    $usuario_cuidad=$_POST['usuario_cuidad'];
    $usuario_estado_civil=$_POST['usuario_estado_civil']; 
    $usuario_cedula= $_POST['usuario_cedula'];
    $usuario_id = $_POST['usuario_id'];

    $_entity->update($usuario_nombre, $usuario_profesion, $usuario_email, $usuario_pass, $usuario_descripcion, $usuario_experiencia, $usuario_proyectos, $usuario_segundos, $usuario_authorize,$usuario_nacimiento,$usuario_direccion,$usuario_celular,$usuario_cuidad,$usuario_estado_civil,$usuario_cedula,$usuario_id);

    if (isset($_FILES['usuario_foto'])) {
        $usuario_foto = $_FILES['usuario_foto'];
        if ($usuario_foto['tmp_name'] != "" or $usuario_foto['tmp_name'] != null) {
            if (!file_exists('../../../view/src/files/usuario_foto')) {
                mkdir("../../../view/src/files/usuario_foto", 0700);
            }

            $desde = $usuario_foto['tmp_name'];
            $hasta = "../../../view/src/files/usuario_foto/" . $usuario_id . ".png";
            copy($desde, $hasta);
            $_entity->updateUsuario_foto($usuario_id . ".png", $usuario_id);
        }
    }

    if (isset($_FILES['usuario_logo'])) {
        $usuario_logo = $_FILES['usuario_logo'];
        if ($usuario_logo['tmp_name'] != "" or $usuario_logo['tmp_name'] != null) {
            if (!file_exists('../../../view/src/files/usuario_logo')) {
                mkdir("../../../view/src/files/usuario_logo", 0700);
            }

            $desde = $usuario_logo['tmp_name'];
            $hasta = "../../../view/src/files/usuario_logo/" . $usuario_id . ".png";
            copy($desde, $hasta);
            $_entity->updateUsuario_logo($usuario_id . ".png", $usuario_id);
        }
    }

    if (isset($_FILES['usuario_portada1'])) {
        $usuario_portada1 = $_FILES['usuario_portada1'];
        if ($usuario_portada1['tmp_name'] != "" or $usuario_portada1['tmp_name'] != null) {
            if (!file_exists('../../../view/src/files/usuario_portada1')) {
                mkdir("../../../view/src/files/usuario_portada1", 0700);
            }

            $desde = $usuario_portada1['tmp_name'];
            $hasta = "../../../view/src/files/usuario_portada1/" . $usuario_id . ".png";
            copy($desde, $hasta);
            $_entity->updateUsuario_portada1($usuario_id . ".png", $usuario_id);
        }
    }

    if (isset($_FILES['usuario_portada2'])) {
        $usuario_portada2 = $_FILES['usuario_portada2'];
        if ($usuario_portada2['tmp_name'] != "" or $usuario_portada2['tmp_name'] != null) {
            if (!file_exists('../../../view/src/files/usuario_portada2')) {
                mkdir("../../../view/src/files/usuario_portada2", 0700);
            }

            $desde = $usuario_portada2['tmp_name'];
            $hasta = "../../../view/src/files/usuario_portada2/" . $usuario_id . ".png";
            copy($desde, $hasta);
            $_entity->updateUsuario_portada2($usuario_id . ".png", $usuario_id);
        }
    }

    if (isset($_FILES['usuario_curriculum'])) {
        $usuario_curriculum = $_FILES['usuario_curriculum'];
        if ($usuario_curriculum['tmp_name'] != "" or $usuario_curriculum['tmp_name'] != null) {
            if (!file_exists('../../../view/src/files/usuario_curriculum')) {
                mkdir("../../../view/src/files/usuario_curriculum", 0700);
            }

            $desde = $usuario_curriculum['tmp_name'];
            $hasta = "../../../view/src/files/usuario_curriculum/" . $usuario_id . ".pdf";
            copy($desde, $hasta);
            $_entity->updateUsuario_curriculum($usuario_id . ".pdf", $usuario_id);
        }
    }

    echo json_encode(["Success"]);
} else {
    echo json_encode([null]);
}
