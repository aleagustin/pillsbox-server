import { Router } from 'express';
import { pillsBoxController } from '../controllers/pillsbox.controller';
import { authJwt } from '../middlewares/authJwt';

class PillsBoxRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/user/:idUser/pillsbox/:id', [authJwt.verifyToken], pillsBoxController.getById);
        this.router.get('/user/:idUser/pillsbox', [authJwt.verifyToken], pillsBoxController.getByUsuario);
        this.router.post('/user/:idUser/pillsbox', [authJwt.verifyToken], pillsBoxController.save);
        this.router.put('/user/:idUser/pillsbox', [authJwt.verifyToken], pillsBoxController.update);
        this.router.delete('/user/:idUser/pillsbox/:id', [authJwt.verifyToken], pillsBoxController.delete);
    }
}

export const pillsBoxRouter = new PillsBoxRouter();