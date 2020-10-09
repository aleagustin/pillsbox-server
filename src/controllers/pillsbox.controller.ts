import { Request, Response} from 'express';
import { pillsBoxDao} from '../dao/pillsbox.dao';
import { PillsBox } from '../models/pillsbox.model';

class PillsBoxController {

    public async getById(req: Request, res: Response) {
        console.log('PillsBoxController.getById');
        const { id, idUser } = req.params;
        let pillsBox = await pillsBoxDao.getById(parseInt(id));
        return res.json(pillsBox);
    }

    public async getByUsuario(req: Request, res: Response) {
        console.log('PillsBoxController.getByUsuario');
        const { idUser } = req.params;
        let pillsBox: PillsBox [] = await pillsBoxDao.getByUsuario(parseInt(idUser), 0, 10);
        return res.json(pillsBox);
    }

    public async save(req: Request, res: Response) {
        console.log('PillsBoxController.save')
        console.log(req.body);
        const { nombre, usuarioId, fechaCreacion } = req.body;

        let  pillsBox: PillsBox = new PillsBox(0, nombre, usuarioId, new Date(fechaCreacion));
        let result = await pillsBoxDao.save(pillsBox).catch( (err) => { console.log("PillsBoxController.save", err) });
        if(result) {
            return res.status(200).json({'message': "Pillsbox creado correctamente"});
        } 
        return res.status(500).json({'message': "Error creando Pillsbox"});
    }

    public async update(req: Request, res: Response) {
        console.log('PillsBoxController.update')
        console.log(req.body);
        const { id, nombre, usuarioId, fechaCreacion } = req.body;

        let  pillsBox: PillsBox = new PillsBox(id, nombre, usuarioId, new Date(fechaCreacion));
        let result = await pillsBoxDao.update(pillsBox).catch( (err) => { console.log("PillsBoxController.update", err) });
        if(result) {
            return res.status(200).json({'message': "Pillsbox modificado correctamente"});
        } 
        return res.status(500).json({'message': "Error modificando Pillsbox"});

    }

    public async delete(req: Request, res: Response) {
        let resultado: boolean = false;
        console.log('PillsBoxController.delete');
        const { id } : any = req.params;
        
        resultado = await pillsBoxDao.delete(new PillsBox(id)).catch( err => {  console.log(err); return false; });
        if(resultado) {
            return res.json({ 'message': 'Pillsbox eliminado correctamente'});
        }
        return res.status(500).json({ 'message': 'Error borrando pillsbox'});
    }

}

export const pillsBoxController = new PillsBoxController();