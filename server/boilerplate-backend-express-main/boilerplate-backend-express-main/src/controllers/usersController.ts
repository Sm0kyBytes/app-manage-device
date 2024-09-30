import express, { NextFunction, Request, Response, Router } from "express";
import { ReponseTitleEnum as r, ReponseStatusCodeEnum as s , ReponseMessageEnum as m } from "../enum/response";
import { UserModule } from "../../src/modules/users/users.module";
import { UserRequest } from "../../src/modules/users/dto/request";


export class UserController {
    private userModule: UserModule;
    public router: Router;
    constructor(userModule: UserModule) {
        this.userModule = userModule;
        this.router = express.Router();
        this.routes();
    }
    private routes() {
        this.router.get("/", this.getAll.bind(this));
        this.router.post("/", this.create.bind(this));
        this.router.get("/:id", this.getOne.bind(this));
        // this.router.put("/:id", this.update.bind(this));
        // this.router.delete("/:id", this.delete.bind(this));
    }
    private async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const Id = req.params.id;

            const user = await this.userModule.getInfo(Id);
            res.responseJson(s.SUCCESS, r.SUCCESS, m.SUCCESS, user, null);
        } catch (error) {
            next(error);
        }
    }
    private async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const limit = req?.query?.limit || null;
            const page = req?.query?.page || null;

            const response = await this.userModule.getAll(Number(limit), Number(page));
            res.responseJson(s.SUCCESS, r.SUCCESS, m.SUCCESS, response, null);
        } catch (error) {
            next(error);
        }
    }
    private async create(req: Request<{}, {}, UserRequest>,  res: Response, next: NextFunction) {
        try {
            // const { firstName, lastName, phone, country, email, password } = req.body ;
            const body = req.body as UserRequest
            const response = await this.userModule.create(body);
            res.responseJson(s.SUCCESS, r.SUCCESS, m.SUCCESS, response, null);
        } catch (error) {
            next(error);
        }
    }
    // private async update(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const Id = req.params.id;
    //         const { firstName, lastName, phone, country, email, password, creditRemain } = req.body;
    //         const languageCode = req.get("Accept-Language");
    //         const response = await this.userModule.update(
    //             Id,
    //             languageCode,
    //             firstName,
    //             lastName,
    //             phone,
    //             country,
    //             email,
    //             password,
    //             creditRemain
    //         );
    //         res.responseJson(s.SUCCESS, r.SUCCESS, m.SUCCESS, response, null);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
    // private async delete(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const Id = req.params.id;
    //         const response = await this.userModule.delete(Id);
    //         res.responseJson(s.SUCCESS, r.SUCCESS, m.SUCCESS, response, null);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}
