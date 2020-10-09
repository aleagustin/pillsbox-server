import { Request, Response} from 'express';
import { posologiaDao } from '../dao/posologiaToma.dao';
import { Posologia } from '../models/posologiaToma.model';

class PosologiaController {

        public async getById(req: Request, res: Response) {
            console.log('PosologiaController.getById');
            const { idUser, id } : any = req.params;
            let posologia = await posologiaDao.getById(idUser, id);
            return res.json(posologia);
        }
    
        //Revisar
        public async getByMedicine(req: Request, res: Response) {
            
            console.log('PosologiaController.getBypillsbox');
            const { idUser, idMedicacion } : any = req.params;
            let posologia: Posologia [] = await posologiaDao.getByMedicine(idUser, idMedicacion, 0, 10);
            return res.json(posologia);
        }
    
        public async save(req: Request, res: Response) {
            
            console.log('PosologiaController.save')
            console.log(req.body);


            const { idMedicacion,hora,minutos,lunes,martes,miercoles,jueves,viernes,sabado,domingo  } = req.body;
    
            let  posologia: Posologia = new Posologia(0, idMedicacion, hora,minutos,lunes,martes,miercoles,jueves,viernes,sabado,domingo);
            let posologiaResult: Posologia  [] =  await posologiaDao.save(posologia).catch( (err) => { console.log("PosologiaController.save", err); return [] }); // Deberia devolver array de posologias la funcion del dao
            if(posologiaResult.length > 0) {
                return res.json(posologiaResult);
            } 
            return res.status(500).json({'message': "Error creando Posologia"});
        }
    
        public async update(req: Request, res: Response) {
            console.log('PosologiaController.update')
            console.log(req.body);
            const { id,pillsBoxId, idMedicacion, hora,minutos,lunes,martes,miercoles,jueves,viernes,sabado,domingo } = req.body;
    
            let  posologia: Posologia = new Posologia(id, pillsBoxId, hora,minutos,lunes,martes,miercoles,jueves,viernes,sabado,domingo);
            let result = await posologiaDao.update(posologia).catch( (err) => { console.log("MedicineController.update", err) });
            if(result) {
                return res.status(200).json({'message': "Posologia modificada correctamente"});
            } 
            return res.status(500).json({'message': "Error modificando Posologia"});
    
        }
    
        public async delete(req: Request, res: Response) {
           /* let resultado: boolean = false;
            console.log('PosologiaController.delete');
            const { idUser, id } : any = req.params;
            
            resultado = await medicineDao.delete(idUser, new Medicine(id)).catch( err => {  console.log(err); return false; });
    
            if(resultado) {
                return res.json({ 'message': 'Medicina eliminada correctamente'});
            }
    
            return res.status(500).json({ 'message': 'Error borrando Medicina'});*/
        }
    
    }
    
    export const posologiaController = new PosologiaController();