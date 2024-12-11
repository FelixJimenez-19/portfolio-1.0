<?php
/* 
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/dao/ComponenteDao.php
*/
class ComponenteDao
{
    private $conn;
    public function __construct()
    {
        $this->conn = new Mysql();
    }
    public function select()
    {
        return $this->conn->query("
            SELECT * FROM componente 
                ORDER BY componente_prioridad ASC
        ");
    }
    public function selectById($componente_id)
    {
        return $this->conn->query("
            SELECT * FROM componente 
            WHERE componente_id = $componente_id
            ORDER BY componente_prioridad ASC
        ");
    }
    public function selectByUsuarioId($usuario_id)
    {
        return $this->conn->query("
            SELECT * FROM componente 
            WHERE usuario_id = $usuario_id
            ORDER BY componente_prioridad ASC
        ");
    }
    public function insert($componente_nombre, $componente_prioridad, $componente_archivo, $usuario_id)
    {
        return $this->conn->query("INSERT INTO componente SET componente_nombre='$componente_nombre', componente_prioridad=$componente_prioridad, componente_archivo='$componente_archivo', usuario_id=$usuario_id ");
    }
    public function update($componente_nombre, $componente_prioridad, $componente_archivo, $usuario_id, $componente_id)
    {
        return $this->conn->query("UPDATE componente SET componente_nombre='$componente_nombre', componente_prioridad=$componente_prioridad, componente_archivo='$componente_archivo', usuario_id=$usuario_id WHERE componente_id = $componente_id ");
    }
    public function delete($componente_id)
    {
        return $this->conn->query("DELETE FROM componente WHERE componente_id = $componente_id ");
    }
}
?>

