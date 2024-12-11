<?php
/* 
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/dao/UsuarioDao.php
*/
class UsuarioDao
{
    private $conn;
    public function __construct()
    {
        $this->conn = new Mysql();
    }
    public function select()
    {
        return $this->conn->query("SELECT * FROM usuario");
    }
    public function selectById($usuario_id)
    {
        return $this->conn->query("SELECT * FROM usuario WHERE usuario_id = $usuario_id");
    }
    public function search($text)
    {
        return $this->conn->query("SELECT * FROM usuario WHERE usuario_id = '$text' OR usuario_nombre LIKE '$text%'");
    }
    public function insert($usuario_nombre, $usuario_profesion, $usuario_email, $usuario_pass, $usuario_descripcion, $usuario_experiencia, $usuario_proyectos, $usuario_segundos, $usuario_authorize,$usuario_nacimiento,$usuario_direccion,$usuario_celular,$usuario_cuidad,$usuario_estado_civil,$usuario_cedula)
    {
        return $this->conn->query("INSERT INTO usuario SET usuario_nombre='$usuario_nombre', usuario_profesion='$usuario_profesion', usuario_email='$usuario_email', usuario_pass='$usuario_pass', usuario_descripcion='$usuario_descripcion', usuario_experiencia=$usuario_experiencia, usuario_proyectos=$usuario_proyectos, usuario_segundos=$usuario_segundos, usuario_authorize=$usuario_authorize,usuario_nacimiento=$usuario_nacimiento,usuario_direccion=$usuario_direccion,usuario_celular=$usuario_celular,usuario_cuidad=$usuario_cuidad,usuario_estado_civil=$usuario_estado_civil,usuario_cedula=$usuario_cedula ");
    }
    public function update($usuario_nombre, $usuario_profesion, $usuario_email, $usuario_pass, $usuario_descripcion, $usuario_experiencia, $usuario_proyectos, $usuario_segundos, $usuario_authorize,$usuario_nacimiento,$usuario_direccion,$usuario_celular,$usuario_cuidad,$usuario_estado_civil,$usuario_cedula, $usuario_id)
    {
        return $this->conn->query("UPDATE usuario SET usuario_nombre='$usuario_nombre', usuario_profesion='$usuario_profesion', usuario_email='$usuario_email', usuario_pass='$usuario_pass', usuario_descripcion='$usuario_descripcion', usuario_experiencia='$usuario_experiencia', usuario_proyectos='$usuario_proyectos', usuario_segundos='$usuario_segundos', usuario_authorize='$usuario_authorize',usuario_nacimiento='$usuario_nacimiento',usuario_direccion='$usuario_direccion',usuario_celular='$usuario_celular',usuario_cuidad='$usuario_cuidad',usuario_estado_civil='$usuario_estado_civil',usuario_cedula=$usuario_cedula WHERE usuario_id = $usuario_id ");
    }
    public function updateSegundos($usuario_segundos, $usuario_id)
    {
        return $this->conn->query("UPDATE usuario SET usuario_segundos=$usuario_segundos WHERE usuario_id = $usuario_id ");
    }
    public function delete($usuario_id)
    {
        return $this->conn->query("DELETE FROM usuario WHERE usuario_id = $usuario_id ");
    }

    public function selectByAll($usuario_nombre, $usuario_profesion, $usuario_email, $usuario_pass, $usuario_descripcion, $usuario_experiencia, $usuario_proyectos, $usuario_segundos, $usuario_authorize)
    {
        return $this->conn->query("SELECT * FROM usuario WHERE usuario_nombre='$usuario_nombre' AND usuario_profesion='$usuario_profesion' AND usuario_email='$usuario_email' AND usuario_pass='$usuario_pass' AND usuario_descripcion='$usuario_descripcion' AND usuario_experiencia=$usuario_experiencia AND usuario_proyectos=$usuario_proyectos AND usuario_segundos=$usuario_segundos AND usuario_authorize=$usuario_authorize ");
    }

    public function updateUsuario_foto($usuario_foto, $usuario_id)
    {
        return $this->conn->query("UPDATE usuario SET usuario_foto='$usuario_foto' WHERE usuario_id = $usuario_id ");
    }

    public function updateUsuario_logo($usuario_logo, $usuario_id)
    {
        return $this->conn->query("UPDATE usuario SET usuario_logo='$usuario_logo' WHERE usuario_id = $usuario_id ");
    }

    public function updateUsuario_portada1($usuario_portada1, $usuario_id)
    {
        return $this->conn->query("UPDATE usuario SET usuario_portada1='$usuario_portada1' WHERE usuario_id = $usuario_id ");
    }

    public function updateUsuario_portada2($usuario_portada2, $usuario_id)
    {
        return $this->conn->query("UPDATE usuario SET usuario_portada2='$usuario_portada2' WHERE usuario_id = $usuario_id ");
    }

    public function updateUsuario_curriculum($usuario_curriculum, $usuario_id)
    {
        return $this->conn->query("UPDATE usuario SET usuario_curriculum='$usuario_curriculum' WHERE usuario_id = $usuario_id ");
    }


    public function login($usuario_email, $usuario_pass)
    {
        return $this->conn->query("SELECT * FROM usuario WHERE usuario_email='$usuario_email' AND usuario_pass='$usuario_pass'");
    }
}
?>

