import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

class AuthJwt {




    public async verifyToken(req: Request, res: Response, next: NextFunction) {
        let token: any = req.headers["x-access-token"];

        if (!token) {
            return res.status(403).json({
                message: "No token provided!"
            });
        }


        verify(token, "clave1234", function (err: any, decode: any) {
            if (err) {
                return res.status(403).json({
                    message: "Unauthorized!"
                });
            } else {
                const { idUser } = req.params;
                if (idUser == decode.id) {
                    next();
                } else {
                    return res.status(403).json({
                        message: "Unauthorized!"
                    });
                }
            }
        });
    }
    
}

export const authJwt = new AuthJwt();