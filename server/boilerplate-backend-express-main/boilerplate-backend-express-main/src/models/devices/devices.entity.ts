export type DeviceAttributes = {
    deviceId?: string;
    userId?: string;
    deviceName: string;
    description: string;
    category: string;
    createdAt?: Date;
    updatedAt?: Date;
};

class DeviceEntity {
    private device: DeviceAttributes;
    constructor(device: DeviceAttributes) {
        this.device = device;
    }
    public getDevice(): DeviceAttributes {
        return this.device;
    }
    public setDevice(device: DeviceAttributes): void {
        this.device = device;
    }
}
