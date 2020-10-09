import { pool } from '../db/db.config';
import { Usuario } from '../models/usuario.model';

class UsuarioDao {

    public async getUsuarioByEmail(email: string) {
        let res = await pool.query("select * from usuarios where email = $1", [email]);
        let usuarios: Usuario [] = this.toUsuario(res.rows);
        return usuarios;
    }

    public async updateToken(id: number, token: string ) {
        console.log("UsuarioDao.updateToken()");
        console.log("id", id);
        console.log("token", token);
        let res = await pool.query("update usuarios set notificaciones_token = $2  where id = $1", [id, token]);
        if(res.rowCount>0) {
            return true;
        }
        return false;
    }

    public async save(usuario:Usuario) {
        console.log("UsuarioDao.save()");
        console.log(usuario);
        let res = await pool.query("INSERT INTO usuarios (email, contrasena, nombre, apellido, fecha_nacimiento, notificaciones) VALUES($1, $2, $3, $4, $5, $6);", 
            [usuario.email, usuario.contrasena, usuario.nombre, usuario.apellido, usuario.fechaNacimiento, true]);
        if(res.rowCount>0) {
            return true;
        }
        return false;
    }

    public async getUsuarioByMedicacionId(medicacionId: number) {
        let query: string = 'select u.* from usuarios as u inner join pillsbox as p on u.id = p.usuario_id inner join medicacion as m on p.id = m.pillsbox_id where m.id = $1'
        let res = await pool.query(query, [medicacionId]);
        let usuario: Usuario [] = this.toUsuario(res.rows);
        return usuario;
    }
    
    
    private toUsuario( rows: any[] ): Usuario[] {
        let usuario: Usuario[] = [];
        rows.forEach(data => {
            usuario.push(new Usuario(data.id, data.email, data.contrasena, data.nombre, data.apellido, data.fecha_nacimiento, data.notificacion, data.notificaciones_token));
        });
        return usuario;
    }


    


}

export const usuarioDao = new UsuarioDao();