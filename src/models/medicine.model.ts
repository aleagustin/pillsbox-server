import { Posologia } from "./posologiaToma.model";

export class Medicine {
    constructor(
        public id: number,
        public pillsboxId: number = null,
        public nombreComercial: string = '',
        public principioActivo: string = '',
        public fechaCreacion: Date = new Date(),
        public fechaInicio: Date = new Date(),
        public fechaFin: Date = new Date(),
        public ultimaToma: Date = null,
        public proxNotificacion: Date = null,
        public tomas: Posologia [] = []
    ) {}
}