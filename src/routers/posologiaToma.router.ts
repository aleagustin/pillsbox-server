import { Router } from 'express';
import { authJwt } from '../middlewares/authJwt';
import { posologiaController } from '../controllers/posologiaToma.controller';


class PosologiaTomaRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/user/:idUser/posologia/:id', [authJwt.verifyToken], posologiaController.getById);
        this.router.get('/user/:idUser/medicine/:id/posologia', [authJwt.verifyToken], posologiaController.getByMedicine);
        this.router.post('/user/:idUser/posologia', [authJwt.verifyToken], posologiaController.save);
        this.router.put('/user/:idUser/posologia', [authJwt.verifyToken], posologiaController.update);
        this.router.delete('/user/:idUser/posologia/:id', [authJwt.verifyToken], posologiaController.delete);
    }
}

export const posologiaTomaRouter = new PosologiaTomaRouter();
