import express from "express";
import { UserController } from "../../src/controllers/usersController";
import { AuthController } from "../../src/controllers/authController";
import { DeviceController } from "../../src/controllers/deviceController";
import { UserModule } from "../../src/modules/users/users.module";
import { AuthModule } from "../../src/modules/auth/auth.module";
import { DeviceModule } from "../../src/modules/devices/devices.module";
import { verifyToken } from "../../src/middlewares/verifyToken";

const router = express.Router();

const userModule = new UserModule();
const deviceModule = new DeviceModule();
const authModule = new AuthModule();

const userController = new UserController(userModule);
const authController = new AuthController(authModule);
const deviceController = new DeviceController(deviceModule);

router.use("/auth", authController.router);
router.use("/user", userController.router);
router.use("/device", verifyToken, deviceController.router);

export default router;
