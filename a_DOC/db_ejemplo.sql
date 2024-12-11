DROP DATABASE documentos_ists;

CREATE DATABASE documentos_ists;

USE documentos_ists;

CREATE TABLE documento_tipo (
    documento_tipo_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    documento_tipo_nombre VARCHAR(50),
    documento_tipo_descripcion VARCHAR(50),
    documento_tipo_atributo VARCHAR(50)
) ENGINE INNODB;

-- @@@@options: { "files":[{"type":"pdf", "name":"documento_pdf"}] }
CREATE TABLE documento (
    documento_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    documento_nombre VARCHAR(50),
    documento_descripcion VARCHAR(50),
    documento_estado VARCHAR(50),
    documento_fecha VARCHAR(50),
    documento_propietario VARCHAR(50),
    documento_formato VARCHAR(50),
    documento_carpeta INT,
    documento_tipo_id INT,
    documento_pdf VARCHAR(10),
    FOREIGN KEY (documento_tipo_id) REFERENCES documento_tipo (documento_tipo_id)
) ENGINE INNODB;

CREATE TABLE usuario_tipo (
    usuario_tipo_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    usuario_tipo_nombre VARCHAR(50),
    usuario_tipo_descripcion VARCHAR(50)
) ENGINE INNODB;

-- @@@@options:{ "account": {"user":"usuario_user","pass":"usuario_pass"}, "files": [{"type":"png", "name":"usuario_foto"}] }
CREATE TABLE usuario (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    usuario_nombre VARCHAR(50),
    usuario_apellido VARCHAR(50),
    usuario_fecha_alta VARCHAR(50),
    usuario_fecha_baja VARCHAR(50),
    usuario_user VARCHAR(50),
    usuario_pass VARCHAR(50),
    usuario_foto VARCHAR(10),
    usuario_tipo_id INT,
    FOREIGN KEY (usuario_tipo_id) REFERENCES usuario_tipo (usuario_tipo_id)
) ENGINE INNODB;

CREATE TABLE copia_pega (
    copia_pega_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    documento_id INT,
    usuario_id INT,
    FOREIGN KEY (documento_id) REFERENCES documento (documento_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
) ENGINE INNODB;