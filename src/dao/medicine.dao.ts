import { pool } from '../db/db.config';
import { Medicine } from '../models/medicine.model';
import { Posologia } from '../models/posologiaToma.model';
import { posologiaController } from '../controllers/posologiaToma.controller';
import { getProximaToma } from '../utils/posologia.util';

class MedicineDao {

    public async getById(id: number) {
        console.log('MedicineDao.getById');
        let res = await pool.query('SELECT * FROM medicacion WHERE id = $1', [id]);
        let medicine: Medicine[] = this.toMedicine(res.rows);
        return medicine;
    }

    public async getByPillsBox(idUser: number, pillboxId: number, page: number, size: number) {
        console.log('MedicineDao.getById');
        console.log("idUser", idUser);
        console.log("pillboxId", pillboxId);
        let res = await pool.query('select m.* from medicacion as m inner join pillsbox as p on m.pillsbox_id = p.id where p.id = $1 and p.usuario_id  = $2', [pillboxId, idUser]);
        let medicine: Medicine[] = this.toMedicine(res.rows); /****Esta linea explicar****/
        return medicine;
    }

    public async getMedicineByFechaNotificacion(fecha: Date) {
        console.log("MedicacionDao.getMedicacionByFechaNotificacion() ...");
        console.log("fechaNotificacion", fecha);
        let res = await pool.query('select m.*' +
                                        ' from medicacion as m '+ 
                                            'inner join pillsbox as p on m.pillsbox_id = p.id ' +
                                            'inner join usuarios as u on p.usuario_id = u.id ' +
                                            'where u.notificaciones = true and m.prox_notificacion <= $1',
                                 [ fecha ]);
        let medicacion: Medicine [] = this.toMedicine(res.rows);
        //console.log(medicacion);
        return medicacion;

    }

    public async actualizarFechaProxNotificacion(idMedicine: number, fechaProxNotificacion: Date) {
        console.log("MedicacionDao.actualizarFechaProxNotificacion() ...");

        let res = await pool.query('UPDATE medicacion SET prox_notificacion = $2 WHERE id = $1', [idMedicine, fechaProxNotificacion]);
        
        if( res.rowCount > 0)  {
            return true;
        }
        return false;

    }

    public async save(medicine: Medicine) {
        console.log("MedicineDao.save", medicine);

        try {

            await pool.query('BEGIN'); // Comienza transacción.

            // Calcular la fecha / hora de próxima notificación.
            
            // Añadimos la claúsula RETURNING* para que devuelva la fila insertada.

            // Calculamos la fecha de la próxima notificación
            let proxNotificacion: Date = getProximaToma(new Date(), medicine.tomas);

            /*********************************************** */
            //Preguntar si es correcto Y tambien al poner mas posologias como funciona porque volveria a crear la medicina? 
            //Lo primero que hago aca es me genero una medicación sin pasarle la toma.
            let res = await pool.query('INSERT INTO medicacion (pillsbox_id, nombre_comercial, principio_activo, fecha_creacion, posologia_fecha_inicio, posologia_fecha_fin, posologia_ultima_toma, prox_notificacion) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING*',
                    [ medicine.pillsboxId, medicine.nombreComercial, medicine.principioActivo, medicine.fechaCreacion, medicine.fechaInicio, medicine.fechaFin, medicine.ultimaToma, proxNotificacion]);

            let idMedicacion = res.rows[0].id; //Luego al tener el returning que  devuelve lo insertado obtengo la medicacion recien insertada
            console.log("idMedicacion", idMedicacion);

            /*******
             * Le adjudico el id de una posologia en este caso la recién insertada el id de la medicina
             */

            for(let i=0; i< medicine.tomas.length; i++) { // En el array de tomas desde el objeto medicina.tomas entro en el array y inserto la toma
                let posologia: Posologia = medicine.tomas[i];
                //Aqui lo que hago es el idmedicacion de la linea 41 contiene el Id de la medicina creada anteriormente pues le inserto la toma
                let query: string = 'INSERT INTO posologia_toma (medicacion_id, hora, minutos, lunes, martes, miercoles, jueves, viernes, sabado, domingo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
                let res = await pool.query(query, [idMedicacion, posologia.hora, posologia.minutos, posologia.lunes, posologia.martes, posologia.miercoles, posologia.jueves, posologia.viernes, posologia.sabado, posologia.domingo]);
            }

            await pool.query('COMMIT'); // Fin de transacción.

        } catch (e) {
            await pool.query('ROLLBACK'); // En caso de error, se deshacen todos los cambios realizados en BD.
            throw e;
        }
    }


    //VER ACA COMO HACERLO

    public async update(medicine: Medicine) {
        console.log("medicineDao.save", medicine);

        let res = await pool.query('UPDATE medicacion SET  nombre_comercial = $2, principio_activo = $3, fecha_creacion = $4, posologia_fecha_inicio = $5, posologia_fecha_fin = $6, posologia_ultima_toma= $7  WHERE id = $1 ',
            [medicine.id, medicine.nombreComercial, medicine.principioActivo, medicine.fechaCreacion, medicine.fechaInicio, medicine.fechaFin, medicine.ultimaToma]);
            
        if (res.rowCount > 0) {
            return true;
        }
        return false;
    }

    public async delete(idUser:number, medicine: Medicine) {
        console.log('medicine.getById');
        let query = 'DELETE FROM medicacion AS m  WHERE m.id = $2 and m.pillsbox_id  in (select id  FROM pillsbox as p where p.usuario_id  = $1)'
        let res = await pool.query(query, [idUser, medicine.id]);
        if (res.rowCount > 0) {
            return true;
        }
        return false;
    }


    private toMedicine(rows: any[]): Medicine[] {
        let medicine: Medicine[] = [];
        rows.forEach(data => {

            console.log("data", data);
            
            medicine.push(new Medicine(data.id,
                data.pillsbox_id,
                data.nombre_comercial,
                data.principio_activo,
                data.fecha_creacion, 
                data.posologia_fecha_inicio, 
                data.posologia_fecha_fin,
                data.posologia_ultima_toma,
                data.prox_notificacion));
        });
        return medicine;
    }


}

export const medicineDao: MedicineDao = new MedicineDao();