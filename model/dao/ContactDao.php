<?php
/* 
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/dao/ContactDao.php
*/
class ContactDao
{
    private $conn;
    public function __construct()
    {
        $this->conn = new Mysql();
    }
    public function select()
    {
        return $this->conn->query("SELECT * FROM contact");
    }
    public function selectById($contact_id)
    {
        return $this->conn->query("SELECT * FROM contact WHERE contact_id = $contact_id");
    }
    public function selectByUsuarioId($usuario_id)
    {
        return $this->conn->query("SELECT * FROM contact WHERE usuario_id = $usuario_id");
    }
    public function insert($contact_nombre, $contact_url, $contact_icon, $usuario_id)
    {
        return $this->conn->query("INSERT INTO contact SET contact_nombre='$contact_nombre', contact_url='$contact_url', contact_icon='$contact_icon', usuario_id=$usuario_id ");
    }
    public function update($contact_nombre, $contact_url, $contact_icon, $usuario_id, $contact_id)
    {
        return $this->conn->query("UPDATE contact SET contact_nombre='$contact_nombre', contact_url='$contact_url', contact_icon='$contact_icon', usuario_id=$usuario_id WHERE contact_id = $contact_id ");
    }
    public function delete($contact_id)
    {
        return $this->conn->query("DELETE FROM contact WHERE contact_id = $contact_id ");
    }
}
