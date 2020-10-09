export class Usuario {
    constructor(
        public id: number,
        public email: string,
        public contrasena: string,
        public nombre: string,
        public apellido: string,
        public fechaNacimiento: Date,
        public notificaciones: boolean,
        public notificacionesToken: string = '',
        public accessToken: string = ''
    ) {}
}