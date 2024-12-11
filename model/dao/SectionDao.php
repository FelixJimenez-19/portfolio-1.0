<?php
class SectionDao
{
    private $conn;
    public function __construct()
    {
        $this->conn = new Mysql();
    }
    public function select()
    {
        return $this->conn->query("SELECT * FROM section");
    }
    public function selectById($section_id)
    {
        return $this->conn->query("SELECT * FROM section WHERE section_id = $section_id");
    }
    public function selectByUsuarioId($usuario_id)
    {
        return $this->conn->query("SELECT * FROM section WHERE usuario_id = $usuario_id");
    }
    public function insert($section_titulo,  $section_prioridad, $usuario_id)
    {
        return $this->conn->query("INSERT INTO section SET section_titulo='$section_titulo' , section_prioridad=$section_prioridad, usuario_id=$usuario_id ");
    }
    public function update($section_titulo, $section_prioridad, $usuario_id, $section_id)
    {
        return $this->conn->query("UPDATE section SET section_titulo='$section_titulo', section_prioridad=$section_prioridad,  usuario_id=$usuario_id WHERE section_id = $section_id ");
    }
    public function delete($section_id)
    {
        return $this->conn->query("DELETE FROM section WHERE section_id = $section_id ");
    }
}                      


?>

