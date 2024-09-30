import { UserController } from "../../src/controllers/usersController";
// import { AuthController } from "../../src/controllers/authController";
import { UserModule } from "../../src/modules/users/users.module";
import express from "express";
import { verifyToken } from "../../src/middlewares/verifyToken";
import { DeviceController } from "../../src/controllers/deviceController";
import { DeviceModule } from "../../src/modules/devices/devices.module";

const router = express.Router();

const userModule = new UserModule();
const deviceModel = new DeviceModule();

const userController = new UserController(userModule);
// const authController = new AuthController(userModule);
const deviceController = new DeviceController(deviceModel);

// router.use("/auth", authController.router);
router.use("/user", verifyToken, userController.router);
router.use("/device", verifyToken, deviceController.router);

export default router;
