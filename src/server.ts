import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { pillsBoxRouter } from './routers/pillsbox.router';
import { loginRouter } from './routers/login.router';
import { medicineRouter} from './routers/medicine.router';
import { posologiaTomaRouter} from './routers/posologiaToma.router';
import { pushJob} from './job/push.job';
import { usuarioRouter } from './routers/usuario.router';

class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.routers();
    }

    routers(): void {
        this.app.use(pillsBoxRouter.router);
        this.app.use(loginRouter.router);
        this.app.use(medicineRouter.router);
        this.app.use(posologiaTomaRouter.router);
        this.app.use(usuarioRouter.router)
    }

    start(): void {
        console.log("Starting server ....");
        this.app.listen(this.app.get('port'), ()  => {
            console.log("Server ready");
        });
        // COMENTAR SI DA PROBLEMAS CON HEROKU
        pushJob.start(); 
    }
}

const server = new Server();
server.start();
