import * as jwt from 'jsonwebtoken';
// @ts-ignore
import {HttpException, HttpStatus, Injectable, NestMiddleware, UseFilters} from "@nestjs/common";
// @ts-ignore
import {NextFunction, Request, Response} from "express";
import {CustomRequest} from "./custom.request";
import {HttpExceptionFilter} from "../filters/http-exception.filter";


@Injectable()
@UseFilters(HttpExceptionFilter)
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
            const token = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
            }

        (req as CustomRequest).token = jwt.verify(token, process.env.TOKEN_SECRET);

            next();
    }
}
