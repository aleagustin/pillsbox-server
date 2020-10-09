import { Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';
import { usuarioDao } from '../dao/usuario.dao';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
 
class LoginController {

    /**
     * Verificar las credenciales del usuario (email, contrasaña).
     * Si las credenciales son válidas, se devuelve el token generado. 
     * En caso contrario, devolverá un 403
     */
    public async login(req: Request, res: Response) {

        const { email, contrasena } : any = req.body; 
        console.log("email", email);
        console.log("contrasena", contrasena);

        let usuario: Usuario [] = await usuarioDao.getUsuarioByEmail(email);
        if(usuario.length <= 0) {
            return res.status(403).json({ message: "El usuario no existe"});
            //Compara la contraseña en texto plano con la hash que viene de la DB
        } else if( compareSync(contrasena, usuario[0].contrasena) ) {
            // Contraseña correcta. Por tanto, hay que generar el token.

            let token: string = sign( 
                 { // PAYLOAD (Objeto con los datos del usuario y autorización claims (administrador, usuario avanzado, etc .) )
                    id: usuario[0].id
                 }, 
                "clave1234", // Clave privada.
                 {  // Objeto con las propiedades de configuración            
                     expiresIn: 86400 // Caducidad del token ( 24h ) segundos
                 })
            console.log("token", token);
            usuario[0].accessToken = token;
            return res.json(usuario);
        } else {
            return res.status(403).json({ message: "Contraseña incorrecta"});
        }

    }
}

export const loginController = new LoginController();