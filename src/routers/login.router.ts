import { Router } from 'express';
import { loginController } from '../controllers/login.controller';

class LoginRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', loginController.login);
    }
}

export const loginRouter = new LoginRouter();