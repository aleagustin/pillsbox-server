import { Request, Response} from 'express';
import { pillsBoxDao} from '../dao/pillsbox.dao';
import { PillsBox } from '../models/pillsbox.model';
import { usuarioDao } from '../dao/usuario.dao';
import { Usuario } from '../models/usuario.model';
import { hashSync} from 'bcrypt';

class UsuarioController {

/*******Esto es parte del registro de la push donde le generamos el token al usuario y la query la implementamos en el usuarioDao*******/

    public async registrarToken(req: Request, res: Response) {
        console.log("UsuarioController.registrarToken()");
        const { idUser } : any = req.params;
        const { token } : any = req.body;
        let result = usuarioDao.updateToken(idUser, token);
        if(result) {
            return res.status(200).json({'message': "Token registrado correctamente"});
        } 
        return res.status(500).json({'message': "Error registrando token"});
    }

    public async create(req: Request, res: Response) {
        console.log("UsuarioController.create()");
        const { email, contrasena, nombre, apellido, fechaNacimiento, notificaciones } : any = req.body;

        let passHash: string = hashSync(contrasena, 5); //Antes de ponerla en base de datos hago el hash de la contraseña luego en el login  comparo la contrasena en texto plano
        //con la hash de la BD

        let usuarioNew: Usuario = new Usuario(null, email, passHash, nombre, apellido, fechaNacimiento, notificaciones, null, null);

        let usuarioExiste:Usuario [] = await usuarioDao.getUsuarioByEmail(email);
        if(usuarioExiste.length>0) {
            return res.status(500).json({'message': "Ya existe un usuario con el email proporcionado"});
        }

        let result = await usuarioDao.save(usuarioNew);
        if(result) {
            return res.status(200).json({'message': "Usuario creado correctamente"});
        } 
        return res.status(500).json({'message': "Error creando usuario"});
    }


}

export const usuarioController: UsuarioController = new UsuarioController();