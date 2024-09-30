import express, { NextFunction, Request, Response } from "express";
import compression from "compression";
import cors from "cors";
import path from "path";
import createHttpError from "http-errors";
import { responseJsonWrapper } from "../middlewares/responseJson";
import Helmet from "helmet";
import { errorHandler } from "../errors/error";
import { ReponseTitleEnum as r, ReponseStatusCodeEnum as s } from "../enum/response";
import v1 from "../../src/routes/v1";
import { initSequelize } from "../../src/db/sequelize";

export async function createApp(): Promise<express.Express> {
    const app = express();
    // const port = process.env.PORT || 8000;
    await initSequelize()
    app.use(Helmet());
    app.use(compression());
    app.use(cors({ origin: "*" }));
    app.set("view engine", "jade");
    app.set("trust proxy", false);
    app.use(express.urlencoded({ limit: "100mb", extended: true }));
    app.use(express.json({ limit: "100mb" }));

    // app.use("/static", express.static(path.join(__dirname, "public")));
    app.use(responseJsonWrapper);
    app.use("/v1", v1);

    app.get("/", (req: Request, res: Response) => {
        res.send("Hello, TypeScript Express!");
    });

    app.get("/test", (req: Request, res: Response) => {
        res.responseJson(s.SUCCESS, r.SUCCESS, "Success", null, null);
    });

    // error handler
    // catch 404 and forward to error handler
    const errorForward: express.RequestHandler = (req, res, next) => {
        next(createHttpError(s.NOT_FOUND));
    };
    app.use(errorForward);
    app.use(errorHandler);
    return app
    // app.listen(port, () => {
    //     console.log(`Server running on port ${port}`);
    // });
}
