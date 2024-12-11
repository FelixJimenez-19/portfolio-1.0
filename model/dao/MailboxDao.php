<?php
/* 
- CREA UN ARCHIVO CON EL NOMBRE Y EXTENSION INDICADA.
- RUTA: proyect/model/dao/MailboxDao.php
*/
class MailboxDao
{
    private $conn;
    public function __construct()
    {
        $this->conn = new Mysql();
    }
    public function select()
    {
        return $this->conn->query("SELECT * FROM mailbox");
    }
    public function selectById($mailbox_id)
    {
        return $this->conn->query("SELECT * FROM mailbox WHERE mailbox_id = $mailbox_id");
    }
    public function selectByUsuarioId($usuario_id)
    {
        return $this->conn->query("SELECT * FROM mailbox WHERE usuario_id = $usuario_id ORDER BY mailbox_id DESC ");
    }
    public function insert($mailbox_nombre, $mailbox_email, $mailbox_mensaje, $usuario_id)
    {
        return $this->conn->query("INSERT INTO mailbox SET mailbox_nombre='$mailbox_nombre', mailbox_email='$mailbox_email', mailbox_mensaje='$mailbox_mensaje', usuario_id=$usuario_id ");
    }
    public function update($mailbox_nombre, $mailbox_email, $mailbox_mensaje, $usuario_id, $mailbox_id)
    {
        return $this->conn->query("UPDATE mailbox SET mailbox_nombre='$mailbox_nombre', mailbox_email='$mailbox_email', mailbox_mensaje='$mailbox_mensaje', usuario_id=$usuario_id WHERE mailbox_id = $mailbox_id ");
    }
    public function delete($mailbox_id)
    {
        return $this->conn->query("DELETE FROM mailbox WHERE mailbox_id = $mailbox_id ");
    }
}
