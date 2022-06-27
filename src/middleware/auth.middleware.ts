import * as jwt  from 'jsonwebtoken';
// @ts-ignore
import {Injectable, NestMiddleware} from "@nestjs/common";
// @ts-ignore
import { NextFunction, Request, Response } from "express";
import {CustomRequest} from "./custom.request";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                throw new Error();
            }

            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            (req as CustomRequest).token = decoded;

            next();
        } catch (err) {
            res.status(401).json('Please authenticate');
        }
    }
}
