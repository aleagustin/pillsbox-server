import { pool } from '../db/db.config';
import { Posologia } from '../models/posologiaToma.model'


class PosologiaDao {

    public async getById(idUser:number, id: number) {
        console.log('PosologiaDao.getById');
        let query: string = 'select * from posologia_toma as t inner join medicacion as m on t.medicacion_id = m.id inner join pillsbox  as p on p.id = m.pillsbox_id where p.usuario_id = $1 and t.id = $2';
        let res = await pool.query(query, [idUser, id]);
        let posologia: Posologia[] = this.toPosologia(res.rows);
        return posologia;
    }

    public async getByMedicine(idUser: number, medicineId: number, page: number, size: number) {
        console.log('PosologiaDao.getById');
        let query: string = 'select * from posologia_toma as t inner join medicacion as m on t.medicacion_id = m.id inner join pillsbox  as p on p.id = m.pillsbox_id where p.usuario_id = $1 and m.id = $2 order by (hora, minutos) asc';
        let res = await pool.query(query, [idUser, medicineId]);
        let posologia: Posologia[] = this.toPosologia(res.rows);
        return posologia;
    }

    public async save(posologia: Posologia ) {
        console.log('PosologiaDao.getById');
        let query: string = 'INSERT INTO posologia_toma (medicacion_id, hora, minutos, lunes, martes, miercoles, jueves, viernes, sabado, domingo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        let res = await pool.query(query, [posologia.idMedicacion, posologia.hora, posologia.minutos, posologia.lunes, posologia.martes, posologia.miercoles, posologia.jueves, posologia.viernes, posologia.sabado, posologia.domingo]);
        let ret: Posologia[] = this.toPosologia(res.rows);
        return ret;
    }

    public async update(posologia: Posologia) {

        console.log("PosologiaDao.save", posologia);

        //TODO COMPLETAR QUERY
        let res = await pool.query("UPDATE pologia_toma SET medicacion_id = $1,hora=$2 ,minutos=$3, lunes=$4, martes=$5, miercoles=$6, jueves=$7, viernes=$8,sabado=$9,sabado=$10 WHERE id = $11",
            [posologia.idMedicacion, posologia.hora, posologia.minutos, posologia.lunes, posologia.martes, posologia.miercoles, posologia.jueves, posologia.viernes, posologia.sabado, posologia.domingo, posologia.id]); // seria nombre comercial?
            
        if (res.rowCount > 0) {
            return true;
        }
        return false;

    }
        
    

    public async delete(idUser: number, posologia: Posologia) {
        console.log('PosologiaDao.getById');
        let query: string = 'delete from posologia_toma as t inner join medicacion as m on t.medicacion_id = m.id inner join pillsbox  as p on p.id = m.pillsbox_id where p.usuario_id = $1 and t.id = $2';
        let res = await pool.query(query, [idUser, posologia.id]);
        if (res.rowCount > 0) {
            return true;
        }
        return false;
    }

    private toPosologia(rows: any[]): Posologia[] {
        let posologia: Posologia[] = [];
        rows.forEach(data => {

            posologia.push(new Posologia(data.id, data.medicacion_id,
                data.hora, data.minutos, data.lunes, data.martes,
                data.miercoles, data.jueves, data.viernes, data.sabado
                , data.domingo

            ));


        });
        return posologia;
    }


}

export const posologiaDao: PosologiaDao = new PosologiaDao();