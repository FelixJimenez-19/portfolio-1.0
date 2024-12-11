                            
<?php

class CertificateDao{
private $conn;
public function __construct(){
$this->conn = new Mysql();
}
public function select(){
return $this->conn->query("SELECT * FROM certificate");
}
public function selectById($certificate_id){
return $this->conn->query("SELECT * FROM certificate WHERE certificate_id = $certificate_id");
}
public function selectByUsuarioId($usuario_id){
return $this->conn->query("SELECT * FROM certificate WHERE usuario_id = $usuario_id");
}

public function insert( $certificate_descripcion, $certificate_estado, $usuario_id){
return $this->conn->query("INSERT INTO certificate SET  certificate_descripcion='$certificate_descripcion', certificate_estado=$certificate_estado, usuario_id=$usuario_id ");
}
public function update( $certificate_descripcion, $certificate_estado, $usuario_id, $certificate_id){
return $this->conn->query("UPDATE certificate SET certificate_descripcion='$certificate_descripcion', certificate_estado=$certificate_estado, usuario_id=$usuario_id WHERE certificate_id = $certificate_id ");
}
public function delete($certificate_id){
return $this->conn->query("DELETE FROM certificate WHERE certificate_id = $certificate_id ");
}
public function selectByAll($certificate_descripcion, $certificate_estado, $usuario_id )
    {
        return $this->conn->query("SELECT * FROM certificate WHERE certificate_descripcion='$certificate_descripcion' AND certificate_estado='$certificate_estado'  AND usuario_id=$usuario_id ");
    }

    public function updatecertificate_imagen($certificate_file, $certificate_id)
    {
        return $this->conn->query("UPDATE certificate SET certificate_file='$certificate_file' WHERE certificate_id = $certificate_id ");
    }

}
?>
            
                        