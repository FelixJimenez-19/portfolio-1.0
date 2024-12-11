<?php
/* 
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/dao/WorksDao.php
*/
class WorksDao
{
    private $conn;
    public function __construct()
    {
        $this->conn = new Mysql();
    }
    public function select()
    {
        return $this->conn->query("SELECT * FROM works");
    }
    public function selectById($works_id)
    {
        return $this->conn->query("SELECT * FROM works WHERE works_id = $works_id");
    }
    public function selectByUsuarioId($usuario_id)
    {
        return $this->conn->query("SELECT * FROM works WHERE usuario_id = $usuario_id");
    }
    public function insert($works_nombre, $works_descripcion, $works_link, $usuario_id)
    {
        return $this->conn->query("INSERT INTO works SET works_nombre='$works_nombre', works_descripcion='$works_descripcion', works_link='$works_link', usuario_id=$usuario_id ");
    }
    public function update($works_nombre, $works_descripcion, $works_link, $usuario_id, $works_id)
    {
        return $this->conn->query("UPDATE works SET works_nombre='$works_nombre', works_descripcion='$works_descripcion', works_link='$works_link', usuario_id=$usuario_id WHERE works_id = $works_id ");
    }
    public function delete($works_id)
    {
        return $this->conn->query("DELETE FROM works WHERE works_id = $works_id ");
    }

    public function selectByAll($works_nombre, $works_descripcion, $works_link, $usuario_id)
    {
        return $this->conn->query("SELECT * FROM works WHERE works_nombre='$works_nombre' AND works_descripcion='$works_descripcion' AND works_link='$works_link' AND usuario_id=$usuario_id ");
    }

    public function updateWorks_imagen($works_imagen, $works_id)
    {
        return $this->conn->query("UPDATE works SET works_imagen='$works_imagen' WHERE works_id = $works_id ");
    }
}
?>

