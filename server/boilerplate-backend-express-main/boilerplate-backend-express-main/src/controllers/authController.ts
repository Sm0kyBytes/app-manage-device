import express, { NextFunction, Request, Response, Router } from "express";
import { ReponseTitleEnum as r, ReponseStatusCodeEnum as s, ReponseMessageEnum as m } from "../enum/response";
import { AuthModule } from "src/modules/auth/auth.module";
import { AuthRequest } from "src/modules/auth/dto/request";
import bcrypt from "bcrypt";
import DefaultError from "../../src/errors/error";
import { ErrorEnum as e } from "../../src/enum/errors";
import jwt from "jsonwebtoken";
import { TokenResponse } from "src/modules/auth/dto/reponse";

export class AuthController {
    private authModule: AuthModule;
    public router: Router;

    constructor(authModule: AuthModule) {
        this.authModule = authModule;
        this.router = express.Router();
        this.routes();
    }

    private routes() {
        this.router.post("/", this.login.bind(this));
    }

    private async login(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as AuthRequest;
            const response = await this.authModule.loginByEmail(body.email);
            if (response?.email !== body.email) throw new DefaultError(e.INVALID_USERNAME_PASSWORD);

            if (!bcrypt.compareSync(body.password, response?.password)) throw new DefaultError(e.INVALID_PASSWORD);
            const token = jwt.sign(
                {
                    userId: response.userId,
                    username: response.username,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    role: "user",
                },
                process.env.JWT_SECRET || "default-secret",
                { expiresIn: process.env.JWT_EXPIRATION }
            );
            const tokenResponse: TokenResponse = { token };
            return res.responseJson(s.SUCCESS, r.SUCCESS, m.SUCCESS, tokenResponse, null);
        } catch (error) {
            next(error);
        }
    }
}
