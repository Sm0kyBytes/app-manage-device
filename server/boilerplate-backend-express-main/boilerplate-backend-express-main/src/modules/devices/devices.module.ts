import DeviceModel from "../../models/devices/devices.model";
import DefaultError from "../../../src/errors/error";
import { ErrorEnum as e } from "../../../src/enum/errors";
import { DeviceRequest } from "./dto/request";
import { DeviceListResponse, DeviceResponse } from "./dto/response";

export class DeviceModule {
    private deviceModel;

    constructor() {
        this.deviceModel = DeviceModel;
    }

    public async getAllForUser(userId: string): Promise<DeviceListResponse> {
        const rows: DeviceResponse[] = await this.deviceModel.findAll({
            where: { userId: userId },
        });

        const count: number = await this.deviceModel.count();
        return { rows, count };
    }

    public async findByName(deviceName: string): Promise<DeviceResponse> {
        const device = await this.deviceModel.findOne({
            where: { deviceName: deviceName },
        });
        return device as DeviceResponse;
    }

    public async getInfo(deviceId: string): Promise<DeviceResponse> {
        const device = await this.deviceModel.findOne({
            where: { deviceId: deviceId },
        });
        return device as DeviceResponse;
    }

    public async create(data: DeviceRequest): Promise<DeviceResponse> {
        if (!!!data.deviceName) throw new DefaultError(e.INVALID_INPUT);
        const userRes = await this.findByName(data.deviceName);
        if (userRes?.deviceName == data.deviceName) throw new DefaultError(e.DUPLICATED_DEVICE);
        const device = await this.deviceModel.create(data);
        return device as DeviceResponse;
    }

    public async update(data: DeviceRequest): Promise<DeviceResponse[]> {
        if (!!!data.deviceId) throw new DefaultError(e.INVALID_INPUT);
        const [rowsAffected, updatedDevices] = await this.deviceModel.update(data, {
            where: { deviceId: data.deviceId },
            returning: true,
        });
        if (rowsAffected === 0) {
            throw new DefaultError(e.INVALID_DATA_FORMAT);
        }
        return updatedDevices as DeviceResponse[];
    }

    public async delete(deviceId: string): Promise<void> {
        console.log("delete >>>>>>>> ", deviceId);
        await this.deviceModel.destroy({ where: { deviceId: deviceId } });
    }
}
