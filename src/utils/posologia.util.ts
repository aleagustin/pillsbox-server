import { Posologia } from "../models/posologiaToma.model";


export function getProximaToma(fechaActual: Date, tomas: Posologia []): Date {
    let offset = 0;
    let proximaToma : Posologia = null;
    let fechaProxToma: Date = new Date(fechaActual);
    

    //Aca si posologia es null y no se acabo la semana
    while(proximaToma == null && offset <= 6) {

        //Aqui la fecha toma que es la fecha actual la actualizamos a la fecha de hoy + 24 * desplazamiento de dias
        fechaProxToma = new Date(fechaActual);
        fechaProxToma.setHours(fechaActual.getHours() + ( 24 * offset) ); // Salto de día
        
        for(let i=0; i<tomas.length; i++ ) {
            // Si se ha cambiado de día y es un día que hay tomar, cogemos la primera.
            if(offset > 0 && validarDiaToma(fechaProxToma, tomas[i])) { 
                proximaToma = tomas[i];
                break;
            } else if( validarDiaToma(fechaProxToma, tomas[i]) ) { // Si fechaToma es un día de la semana en el que hay que tomar la medicación.
               
                // La hora de la toma es menor o igual a la hora acutal
                //En la primera parte del || tenemos que verificar si esa toma ya es anterior a la ultima vez que consumimos el medicamento
                // en la segunda parte del || verificamos la hora actual y los minutos para ver si hay que efectuar la toma.
                if( (fechaProxToma.getHours() < tomas[i].hora) ||
                    (fechaProxToma.getHours() == tomas[i].hora && fechaProxToma.getMinutes() <= tomas[i].minutos) )  {
                    proximaToma = tomas[i];
                    break;
                }
             }
        }
        offset++;
    }
    if(proximaToma != null) {
        fechaProxToma.setHours(proximaToma.hora);
        fechaProxToma.setMinutes(proximaToma.minutos);
        return fechaProxToma;
    }
    return null;
 }

function validarDiaToma(fecha: Date, toma: Posologia): boolean {
    let diaSemanaActual: number = fecha.getDay(); /// Devuelve un número que representa el día de la semana 0 y 7 -> Domingo
    switch(diaSemanaActual){
        case 1:
            return toma.lunes;
            break;
        case 2:
            return toma.martes;
            break;
        case 3:
            return toma.miercoles;
            break;
        case 4:
            return toma.jueves;
            break;
        case 5:
            return toma.viernes;
            break;
        case 6:
            return toma.sabado;
            break;
        case 7:
        case 0:
            return toma.domingo;
            break;
    }

    return false;
 }