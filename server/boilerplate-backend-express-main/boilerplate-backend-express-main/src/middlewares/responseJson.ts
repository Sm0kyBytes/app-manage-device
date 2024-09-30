import { Response, Request, NextFunction } from "express";
import { ReponseTitleEnum as r } from "../enum/response";

interface ResponseJson {
    statusCode: number;
    title: r;
    message: string;
    data: any;
    error: any;
}

export const responseJsonWrapper = (req: Request, res: Response, next: NextFunction) => {
    res.responseJson = (statusCode: number, title: r, message: string, data: any = null, error: any = null) => {
        const response: ResponseJson = {
            statusCode,
            title,
            message,
            data,
            error,
        };
        return res.status(statusCode).json(response);
    };
    next();
};

declare global {
    namespace Express {
        export interface Response {
            responseJson: (statusCode: number, title: r, message: string, data: any, error: any) => Response;
        }
    }
}
