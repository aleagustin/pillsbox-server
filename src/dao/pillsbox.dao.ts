import { pool } from '../db/db.config';
import { PillsBox } from '../models/pillsbox.model';

class PillsBoxDao {

    public async getById(id: number) {
        console.log('PillsBoxDao.getById');
        let res = await pool.query('SELECT * FROM pillsbox WHERE id = $1', [id]);
        let pillsbox: PillsBox[] = this.toPillsBox(res.rows);
        return pillsbox;
    }

    public async getByUsuario(usuarioId: number, page: number, size: number) {
        console.log('PillsBoxDao.getById');
        let res = await pool.query('SELECT * FROM pillsbox WHERE usuario_id = $1 ', [usuarioId]);
        let pillsbox: PillsBox[] = this.toPillsBox(res.rows);
        return pillsbox;
    }

    public async save(pillsBox: PillsBox) {
        console.log("PillsboxDa.save", pillsBox);

        let res = await pool.query('INSERT INTO pillsbox (usuario_id,nombre,fecha_creacion) values ($1,$2,$3)',
            [pillsBox.usuarioId, pillsBox.nombre, pillsBox.fechaCreacion]);

        if (res.rowCount > 0) {
            return true;
        }
        return false;

    }

    public async update(pillsBox: PillsBox) {
        console.log("PillsboxDa.save", pillsBox);

        let res = await pool.query('UPDATE pillsbox SET nombre = $1 WHERE id = $2 ',
            [pillsBox.nombre, pillsBox.id]);
            
        if (res.rowCount > 0) {
            return true;
        }
        return false;

    }

    public async delete(pillsBox: PillsBox) {
        console.log('PillsBoxDao.getById');
        let res = await pool.query('DELETE FROM pillsbox WHERE ID = $1', [pillsBox.id]);
        if (res.rowCount > 0) {
            return true;
        }
        return false;
    }

    private toPillsBox(rows: any[]): PillsBox[] {
        let pillsbox: PillsBox[] = [];
        rows.forEach(data => {
            pillsbox.push(new PillsBox(data.id, data.nombre, data.usuario_id, data.fecha_creacion));
        });
        return pillsbox;
    }


}

export const pillsBoxDao: PillsBoxDao = new PillsBoxDao();