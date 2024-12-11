CREATE DATABASE portfolio;
USE portfolio;

-- @@@@options:{ "account": {"user":"usuario_email","pass":"usuario_pass"}, "files": [{"type":"png", "name":"usuario_foto"},{"type":"png", "name":"usuario_logo"},{"type":"png", "name":"usuario_portada1"},{"type":"png", "name":"usuario_portada2"},{"type":"pdf", "name":"usuario_curriculum"}] }
CREATE TABLE usuario (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    usuario_nombre VARCHAR(70),
    usuario_nacimiento DATE,
    usuario_cedula VARCHAR(11),
    usuario_direccion TEXT,
    usuario_celular VARCHAR(11),
    usuario_cuidad VARCHAR(100),
    usuario_profesion VARCHAR(70),
    usuario_email VARCHAR(50),
    usuario_pass VARCHAR(50),
    usuario_descripcion TEXT,
    usuario_experiencia INT,
    usuario_proyectos INT,
    usuario_segundos INT,
    usuario_authorize BOOLEAN DEFAULT 0,
    usuario_foto VARCHAR(10),
    usuario_logo VARCHAR(10),
    usuario_portada1 VARCHAR(10),
    usuario_portada2 VARCHAR(10),
    usuario_curriculum VARCHAR(10),
    usuario_estado_civil varchar(50)
) ENGINE INNODB;

INSERT INTO usuario SET usuario_nombre="admin", usuario_email="admin", usuario_pass="admin", usuario_authorize=1 ;

CREATE TABLE componente (
    componente_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    componente_nombre VARCHAR(50),
    componente_prioridad INT,
    componente_archivo VARCHAR(50),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
) ENGINE INNODB;

CREATE TABLE skills (
    skills_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    skills_nombre VARCHAR(50),
    skills_porcentaje INT,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
) ENGINE INNODB;

CREATE TABLE services (
    services_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    services_nombre VARCHAR(50),
    services_descripcion TEXT,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
) ENGINE INNODB;

-- @@@@options:{"files": [{"type":"png", "name":"works_imagen"}]}
CREATE TABLE works (
    works_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    works_nombre VARCHAR(50),
    works_descripcion TEXT,
    works_link TEXT,
    works_imagen VARCHAR(10),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
) ENGINE INNODB;

CREATE TABLE mailbox (
    mailbox_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    mailbox_nombre VARCHAR(50),
    mailbox_email VARCHAR(50),
    mailbox_mensaje TEXT,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
) ENGINE INNODB;

CREATE TABLE contact (
    contact_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    contact_nombre VARCHAR(50),
    contact_url TEXT,
    contact_icon VARCHAR(50),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
) ENGINE INNODB;

CREATE TABLE section(
    section_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    section_titulo VARCHAR(250),
    section_prioridad INT,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
) ENGINE INNODB;

CREATE TABLE data(
    data_id INT PRIMARY KEY AUTO_INCREMENT,
    data_titulo VARCHAR(250),
    data_detalle TEXT,
    data_fecha VARCHAR(50),
    section_id INT,
    FOREIGN KEY (section_id) REFERENCES section(section_id)
)ENGINE INNODB;

-- @@@@options:{"files": [{"type":"png", "name":"certificate_file"}]}

CREATE TABLE certificate(
  certificate_id INT PRIMARY KEY AUTO_INCREMENT,
  certificate_file VARCHAR(10),
  certificate_descripcion TEXT,
  certificate_estado TINYINT,
  usuario_id INT,
  FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id)
)ENGINE INNODB;