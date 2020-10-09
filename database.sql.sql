create database pillsbox;

CREATE TABLE usuarios (
 id serial,
 email varchar(100) NOT NULL,   
 contrasena varchar(64)  NOT NULL,
 nombre varchar(20)  NOT NULL,
 apellido varchar(20)  NOT NULL,
 fecha_nacimiento date NOT NULL,
 notificaciones boolean NOT NULL DEFAULT false,
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
 cn varchar(8)  NOT NULL,
 nombre_comercial varchar(200)  NOT NULL,
 principio_activo varchar(100)  NOT NULL,
 PRIMARY KEY (id),
 UNIQUE (cn)
);

CREATE TABLE pillsbox_medicacion (
 id serial,
 pillsbox_id integer NOT NULL,
 medicacion_id integer NOT NULL,
 fecha_creacion date NOT NULL,
 fecha_inicio date NOT NULL,
 fecha_fin date DEFAULT NULL,
 PRIMARY KEY (id),
 UNIQUE (pillsbox_id, medicacion_id),
 CONSTRAINT pillsbox_medicacion_ibfk_1 FOREIGN KEY (medicacion_id) REFERENCES medicacion (id) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT pillsbox_medicacion_ibfk_2 FOREIGN KEY (pillsbox_id) REFERENCES pillsbox (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE horario_medicacion (
 id serial,
 pillsboxmedicacion_id integer NOT NULL,
 hora time NOT NULL,
 lunes boolean NOT NULL DEFAULT false,
 martes boolean NOT NULL DEFAULT false,
 miercoles boolean NOT NULL DEFAULT false,
 jueves boolean NOT NULL DEFAULT false,
 viernes boolean NOT NULL DEFAULT false,
 sabado boolean NOT NULL DEFAULT false,
 domingo boolean NOT NULL DEFAULT false,
 PRIMARY KEY (id),
 UNIQUE (pillsboxmedicacion_id, hora),
 CONSTRAINT horario_medicacion_ibfk_1 FOREIGN KEY (pillsboxmedicacion_id) REFERENCES pillsbox_medicacion (id) ON DELETE CASCADE ON UPDATE CASCADE
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


INSERT INTO medicacion (cn, nombre_comercial,  principio_activo ) VALUES ('62802', 'AMOXICILINA/ACIDO CLAVULANICO SANDOZ 500 mg/125 mg COMPRIMIDOS RECUBIERTOS CON PELICULA EFG', 'AMOXICILINA TRIHIDRATO, CLAVULANATO POTASIO');
INSERT INTO medicacion (cn, nombre_comercial,  principio_activo ) VALUES ('723798', 'ADIRO 100 MG COMPRIMIDOS GASTRORRESISTENTES EFG', 'ACETILSALICILICO ACIDO');

INSERT INTO pillsbox_medicacion (pillsbox_id, medicacion_id, fecha_creacion, fecha_inicio, fecha_fin) VALUES (16, 1, '2020-04-11', '2020-04-11', '2020-04-18');
INSERT INTO pillsbox_medicacion (pillsbox_id, medicacion_id, fecha_creacion, fecha_inicio) VALUES (16, 2, '2020-04-11', '2020-04-11');

INSERT INTO horario_medicacion (pillsboxmedicacion_id, hora, lunes, martes, miercoles, jueves, viernes, sabado, domingo) VALUES (1, '08:00', true, true, true, true, true, true, true);
INSERT INTO horario_medicacion (pillsboxmedicacion_id, hora, lunes, martes, miercoles, jueves, viernes, sabado, domingo) VALUES (1, '16:00', true, true, true, true, true, true, true);
INSERT INTO horario_medicacion (pillsboxmedicacion_id, hora, lunes, martes, miercoles, jueves, viernes, sabado, domingo) VALUES (1, '00:00', true, true, true, true, true, true, true);

INSERT INTO horario_medicacion (pillsboxmedicacion_id, hora, lunes, martes, miercoles, jueves, viernes, sabado, domingo) VALUES (2, '08:00', true, true, true, true, true, true, true);