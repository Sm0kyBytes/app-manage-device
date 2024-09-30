import { Errback, NextFunction, Request, Response } from "express";
import { ErrorEnum as e } from "../enum/errors";
import { ReponseTitleEnum as r, ReponseStatusCodeEnum as s } from "../enum/response";

class DefaultError extends Error {
    errors?: string;
    data?: any;
    error: boolean;
    success: boolean;
    constructor(message: string, errors: string = "", data: any = null) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.errors = errors;
        this.data = data;
        this.error = true;
        this.success = false;
    }
    toJSON = () => {
        return { ...this };
    };
}
export default DefaultError;
export const errorHandler = (err: DefaultError, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV !== "test") console.log(err);

    if (err.name === e.UNAUTHORIZED_ERROR) return res.responseJson(s.UNAUTHORIZED, r.ERROR, err.name, null, err.errors);
    if (err.name === e.VALIDATION_ERROR) {
        return res.responseJson(s.ERROR, r.ERROR, err.name, null, err.errors);
    }
    if (err.message) {
        if (err.errors) return res.responseJson(s.ERROR, r.ERROR, err.message, null, err.errors);
        return res.responseJson(s.ERROR, r.ERROR, err.message, null, err.toString());
    } else {
        return res.status(s.INTERNAL_SERVER_ERROR).end();
    }
};
