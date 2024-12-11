<?php
/* 
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/dao/ServicesDao.php
*/
class ServicesDao
{
    private $conn;
    public function __construct()
    {
        $this->conn = new Mysql();
    }
    public function select()
    {
        return $this->conn->query("SELECT * FROM services");
    }
    public function selectById($services_id)
    {
        return $this->conn->query("SELECT * FROM services WHERE services_id = $services_id");
    }
    public function selectByUsuarioId($usuario_id)
    {
        return $this->conn->query("SELECT * FROM services WHERE usuario_id = $usuario_id");
    }
    public function insert($services_nombre, $services_descripcion, $usuario_id)
    {
        return $this->conn->query("INSERT INTO services SET services_nombre='$services_nombre', services_descripcion='$services_descripcion', usuario_id=$usuario_id ");
    }
    public function update($services_nombre, $services_descripcion, $usuario_id, $services_id)
    {
        return $this->conn->query("UPDATE services SET services_nombre='$services_nombre', services_descripcion='$services_descripcion', usuario_id=$usuario_id WHERE services_id = $services_id ");
    }
    public function delete($services_id)
    {
        return $this->conn->query("DELETE FROM services WHERE services_id = $services_id ");
    }
}
?>

