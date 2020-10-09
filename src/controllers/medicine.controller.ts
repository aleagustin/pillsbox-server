import { Request, Response} from 'express';
import { medicineDao } from '../dao/medicine.dao';
import { Medicine } from '../models/medicine.model';



class MedicineController {

    /**
     * Verificar las credenciales del usuario (email, contrasaña).
     * Si las credenciales son válidas, se devuelve el token generado. 
     * En caso contrario, devolverá un 403
     */

        public async getById(req: Request, res: Response) {
            console.log('medicineController.getById');
            const { id } = req.params;
            let medicine = await medicineDao.getById(parseInt(id));
            return res.json(medicine);

        }
    
        public async getByPillsBox(req: Request, res: Response) {
            console.log('medicineController.getBypillsbox');
            const { idUser, idPillsbox } : any = req.params;
            let medicine: Medicine [] = await medicineDao.getByPillsBox(idUser, idPillsbox, 0, 10);
            return res.json(medicine);
        }
    
        public async save(req: Request, res: Response) {
            console.log('medicineController.save')
            console.log(req.body);
            const { pillsboxId, nombreComercial, principioActivo, fechaCreacion, fechaInicio, fechaFin, ultimaToma, tomas } = req.body;
    
            let  medicine: Medicine = new Medicine(0, pillsboxId, nombreComercial,principioActivo, fechaCreacion,fechaInicio,fechaFin,ultimaToma, null, tomas);
           
            await medicineDao.save(medicine).then( () => {
                return res.status(200).json({'message': "Medicina creada correctamente"})
            }).catch( (err) => { 
                console.log("medicineController.save", err); 
                return res.status(500).json({'message': "Error creando Medicina"});
            });
            
        }
    
        public async update(req: Request, res: Response) {
            console.log('medicineController.update')
            console.log(req.body);
            const { id,pillsboxId, nombreComercial,principioActivo,fechaCreacion,fechaInicio,fechaFin,ultimaToma } = req.body;
    
            let  medicine: Medicine = new Medicine(id, pillsboxId, nombreComercial,principioActivo,new Date(fechaCreacion),fechaInicio,fechaFin,ultimaToma);
            let result = await medicineDao.update(medicine).catch( (err) => { console.log("MedicineController.update", err) });
            if(result) {
                return res.status(200).json({'message': "Medicina modificada correctamente"});
            } 
            return res.status(500).json({'message': "Error modificando Medicina"});
    
        }
    
        public async delete(req: Request, res: Response) {
            let resultado: boolean = false;
            console.log('medicineController.delete');
            const { idUser, id } : any = req.params;
            
            resultado = await medicineDao.delete(idUser, new Medicine(id)).catch( err => {  console.log(err); return false; });
    
            if(resultado) {
                return res.json({ 'message': 'Medicina eliminada correctamente'});
            }
    
            return res.status(500).json({ 'message': 'Error borrando Medicina'});
        }
    
    }
    
    export const medicineController = new MedicineController();