create database pillsbox;

CREATE TABLE usuarios (
 id serial,
 email varchar(100) NOT NULL,   
 contrasena varchar(64)  NOT NULL,
 nombre varchar(20)  NOT NULL,
 apellido varchar(20)  NOT NULL,
 fecha_nacimiento date NOT NULL,
 notificaciones boolean NOT NULL DEFAULT false,
 notificaciones_token varchar(1000) DEFAULT NULL,
 PRIMARY KEY (id),
 UNIQUE (email)
);

CREATE TABLE pillsbox (
 id serial,
 usuario_id integer NOT NULL,
 nombre varchar(20)  NOT NULL,
 fecha_creacion date NOT NULL,
 PRIMARY KEY (id),
 UNIQUE (usuario_id, nombre),
 CONSTRAINT pillsbox_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE medicacion (
 id serial,
 pillsbox_id integer NOT NULL,
 nombre_comercial varchar(200)  NOT NULL,
 principio_activo varchar(100)  NOT NULL,
 fecha_creacion date NOT NULL,
 posologia_fecha_inicio date NOT NULL,
 posologia_fecha_fin date DEFAULT NULL,
 posologia_ultima_toma timestamp DEFAULT NULL,
 prox_notificacion timestamp DEFAULT NULL, 
 PRIMARY KEY (id),
 CONSTRAINT medicacion_ibfk_1 FOREIGN KEY (pillsbox_id) REFERENCES pillsbox (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE posologia_toma (
 id serial,
 medicacion_id integer NOT NULL,
 hora int NOT NULL,
 minutos int NOT NULL,
 lunes boolean NOT NULL DEFAULT false,
 martes boolean NOT NULL DEFAULT false,
 miercoles boolean NOT NULL DEFAULT false,
 jueves boolean NOT NULL DEFAULT false,
 viernes boolean NOT NULL DEFAULT false,
 sabado boolean NOT NULL DEFAULT false,
 domingo boolean NOT NULL DEFAULT false,
 PRIMARY KEY (id),
 CONSTRAINT posologia_toma_ibfk_1 FOREIGN KEY (medicacion_id) REFERENCES medicacion (id) ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO usuarios (email, contrasena, nombre, apellido, fecha_nacimiento) VALUES('alejandromaruottolo@gmail.com', '99800b85d3383e3a2fb45eb7d0066a4879a9dad0', 'Alejandro', 'Maruottolo', '1990-01-01');

INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox1', '2020-04-01');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox2', '2020-04-02');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox3', '2020-04-03');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox4', '2020-04-04');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox5', '2020-04-05');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox6', '2020-04-06');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox7', '2020-04-07');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox8', '2020-04-08');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox9', '2020-04-09');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox10', '2020-04-10');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox11', '2020-04-11');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox12', '2020-04-12');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox13', '2020-04-13');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox14', '2020-04-14');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox15', '2020-04-15');
INSERT INTO pillsbox (usuario_id, nombre, fecha_creacion) VALUES (1, 'Pillbox16', '2020-04-16');


INSERT INTO medicacion (nregistro, pillsbox_id, nombre_comercial, principio_activo, fecha_creacion, posologia_fecha_inicio, posologia_fecha_fin, posologia_ultima_toma ) VALUES ('62802', 16, 'AMOXICILINA/ACIDO CLAVULANICO SANDOZ 500 mg/125 mg COMPRIMIDOS RECUBIERTOS CON PELICULA EFG', 'AMOXICILINA TRIHIDRATO, CLAVULANATO POTASIO', '2020-04-11', '2020-04-11', '2020-04-18', null);
INSERT INTO medicacion (nregistro, pillsbox_id, nombre_comercial, principio_activo, fecha_creacion, posologia_fecha_inicio, posologia_fecha_fin, posologia_ultima_toma ) VALUES ('723798', 16,  'ADIRO 100 MG COMPRIMIDOS GASTRORRESISTENTES EFG', 'ACETILSALICILICO ACIDO', '2020-04-11', '2020-04-11', null, null);

INSERT INTO posologia_toma (medicacion_id, hora, minutos, lunes, martes, miercoles, jueves, viernes, sabado, domingo) VALUES (1, 8, 0, true, true, true, true, true, true, true);
INSERT INTO posologia_toma (medicacion_id, hora, minutos, lunes, martes, miercoles, jueves, viernes, sabado, domingo) VALUES (1, 16, 0, true, true, true, true, true, true, true);
INSERT INTO posologia_toma (medicacion_id, hora, minutos, lunes, martes, miercoles, jueves, viernes, sabado, domingo) VALUES (1, 0, 0, true, true, true, true, true, true, true);

INSERT INTO posologia_toma (medicacion_id, hora, minutos, lunes, martes, miercoles, jueves, viernes, sabado, domingo) VALUES (2, 8, 0, true, true, true, true, true, true, true);