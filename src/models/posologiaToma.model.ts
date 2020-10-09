export class Posologia {
    constructor(
        public id: number,
        public idMedicacion: number = null,
        public hora: number = null,
        public minutos: number = null,
        public lunes: boolean = false,
        public martes: boolean = false,
        public miercoles: boolean = false,
        public jueves: boolean = false,
        public viernes: boolean = false,
        public sabado: boolean = false,
        public domingo: boolean = false,
    ) {}
}