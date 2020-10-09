export class PillsBox {
    constructor(
        public id: number,
        public nombre: string = '',
        public usuarioId: number =  0,
        public fechaCreacion: Date = new Date()
    ) {}
}