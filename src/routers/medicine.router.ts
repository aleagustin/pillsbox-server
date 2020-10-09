import { Router } from 'express';
import { medicineController } from '../controllers/medicine.controller';
import { authJwt } from '../middlewares/authJwt';

class MedicineRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/user/:idUser/medicine/:id', [authJwt.verifyToken], medicineController.getById);
        this.router.get('/user/:idUser/pillsbox/:idPillsbox/medicine', [authJwt.verifyToken], medicineController.getByPillsBox);
        this.router.post('/user/:idUser/medicine', [authJwt.verifyToken], medicineController.save);
        this.router.put('/user/:idUser/medicine', [authJwt.verifyToken], medicineController.update);
        this.router.delete('/user/:idUser/medicine/:id', [authJwt.verifyToken], medicineController.delete);
    }
}

export const medicineRouter = new MedicineRouter();


