<?php
/* 
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/dao/SkillsDao.php
*/
class SkillsDao
{
    private $conn;
    public function __construct()
    {
        $this->conn = new Mysql();
    }
    public function select()
    {
        return $this->conn->query("SELECT * FROM skills");
    }
    public function selectById($skills_id)
    {
        return $this->conn->query("SELECT * FROM skills WHERE skills_id = $skills_id");
    }
    public function selectByUsuarioId($usuario_id)
    {
        return $this->conn->query("SELECT * FROM skills WHERE usuario_id = $usuario_id");
    }
    public function insert($skills_nombre, $skills_porcentaje, $usuario_id)
    {
        return $this->conn->query("INSERT INTO skills SET skills_nombre='$skills_nombre', skills_porcentaje=$skills_porcentaje, usuario_id=$usuario_id ");
    }
    public function update($skills_nombre, $skills_porcentaje, $usuario_id, $skills_id)
    {
        return $this->conn->query("UPDATE skills SET skills_nombre='$skills_nombre', skills_porcentaje=$skills_porcentaje, usuario_id=$usuario_id WHERE skills_id = $skills_id ");
    }
    public function delete($skills_id)
    {
        return $this->conn->query("DELETE FROM skills WHERE skills_id = $skills_id ");
    }
}
?>

