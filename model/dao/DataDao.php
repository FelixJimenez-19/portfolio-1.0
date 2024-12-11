<?php

class DataDao
{
    private $conn;
    public function __construct()
    {
        $this->conn = new Mysql();
    }
    public function select()
    {
        return $this->conn->query("SELECT * FROM data");
    }
    public function selectById($data_id)
    {
        return $this->conn->query("SELECT * FROM data WHERE data_id = $data_id");
    }




    public function selectByUsuarioId($usuario_id)
    {
        return $this->conn->query("
            SELECT * FROM data 
                INNER JOIN section ON data.section_id = section.section_id
                INNER JOIN usuario ON section.usuario_id = usuario.usuario_id
            WHERE usuario.usuario_id = $usuario_id
        ");
    }


    public function insert($data_titulo, $data_detalle, $section_id, $data_fecha)
    {
                return $this->conn->query("INSERT INTO data SET data_titulo='$data_titulo', data_detalle='$data_detalle', section_id =$section_id, data_fecha='$data_fecha'  ");
    }
    public function update($data_titulo, $data_detalle, $section_id ,$data_fecha, $data_id)
    {
        return $this->conn->query("UPDATE data SET data_titulo='$data_titulo', data_detalle='$data_detalle', section_id =$section_id, data_fecha='$data_fecha'  WHERE data_id = $data_id ");
    }
    public function delete($data_id)
    {
        return $this->conn->query("DELETE FROM data WHERE data_id = $data_id ");
    }
}
?>
       
                        