import { Router } from 'express';
import { usuarioController } from '../controllers/usuario.controller';

class UsuarioRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/user/:idUser/pushtoken/', usuarioController.registrarToken);
        this.router.post('/user', usuarioController.create);
    }
}

export const usuarioRouter = new UsuarioRouter();