import express, { NextFunction, Request, Response, Router } from "express";
import { ReponseTitleEnum as r, ReponseStatusCodeEnum as s, ReponseMessageEnum as m } from "../enum/response";
import { DeviceModule } from "../../src/modules/devices/devices.module";
import { DeviceRequest } from "../../src/modules/devices/dto/request";

export class DeviceController {
    private deviceModule: DeviceModule;
    public router: Router;
    constructor(deviceModule: DeviceModule) {
        this.deviceModule = deviceModule;
        this.router = express.Router();
        this.routes();
    }
    private routes() {
        this.router.get("/", this.getAll.bind(this));
        this.router.post("/", this.create.bind(this));
        this.router.get("/:id", this.getOne.bind(this));
        this.router.put("/:id", this.update.bind(this));
        this.router.delete("/:id", this.delete.bind(this));
    }
    private async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const Id = req.params.id;

            const device = await this.deviceModule.getInfo(Id);
            res.responseJson(s.SUCCESS, r.SUCCESS, m.SUCCESS, device, null);
        } catch (error) {
            next(error);
        }
    }
    private async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            // const limit = req?.query?.limit || null;
            // const page = req?.query?.page || null;
            // const response = await this.deviceModule.getAll(Number(limit), Number(page));
            const userId = req?.body?.user?.userId || null; // userId form jwt payload***

            const response = await this.deviceModule.getAllForUser(String(userId));
            res.responseJson(s.SUCCESS, r.SUCCESS, m.SUCCESS, response, null);
        } catch (error) {
            next(error);
        }
    }
    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as DeviceRequest;
            const userId: string = req?.body?.user?.userId;
            body.userId = userId;
            const response = await this.deviceModule.create(body);
            res.responseJson(s.SUCCESS, r.SUCCESS, m.SUCCESS, response, null);
        } catch (error) {
            next(error);
        }
    }

    private async update(req: Request, res: Response, next: NextFunction) {
        try {
            const Id = req.params.id;
            const body = req.body as DeviceRequest;
            const userId: string = req?.body?.user?.userId;
            body.userId = userId;
            body.deviceId = Id;
            const response = await this.deviceModule.update(body);
            res.responseJson(s.SUCCESS, r.SUCCESS, m.SUCCESS, response, null);
        } catch (error) {
            next(error);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const Id = req.params.id;
            const response = await this.deviceModule.delete(Id);
            res.responseJson(s.SUCCESS, r.SUCCESS, m.SUCCESS, response, null);
        } catch (error) {
            next(error);
        }
    }
}
